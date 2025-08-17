'use client'
import {
    forwardRef,
    ForwardRefExoticComponent,
    InputHTMLAttributes,
    RefAttributes,
    useCallback,
    useEffect,
    useState
} from 'react';
import {NumericFormat, NumericFormatProps} from 'react-number-format';
import {Input} from '@/components/ui/input';
import {Label} from "@/components/ui/label";
import * as React from "react";
import {ErrorMessage, FormikProps, useField} from "formik";
import {cn} from "@/lib/utils";

export interface NumberInputProps
    extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
    stepper?: number;
    thousandSeparator?: string;
    placeholder?: string;
    defaultValue?: number;
    min?: number;
    max?: number;
    value?: number; // Controlled value
    suffix?: string;
    prefix?: string;
    onValueChange?: (value: number | undefined) => void;
    fixedDecimalScale?: boolean;
    formikProps: FormikProps<any>;
    decimalScale?: number;
    label?: string;
    DaisyInput?: ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>>;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            stepper,
            thousandSeparator,
            placeholder,
            defaultValue,
            min = -Infinity,
            max = Infinity,
            onValueChange,
            fixedDecimalScale = false,
            DaisyInput = null,
            decimalScale = 0,
            suffix,
            prefix,
            formikProps,
            value: controlledValue,
            ...props
        },
        ref
    ) => {
        const [value, setValue] = useState<number | undefined>(
            controlledValue ?? defaultValue
        );

        const handleIncrement = useCallback(() => {
            setValue((prev) =>
                prev === undefined ? stepper ?? 1 : Math.min(prev + (stepper ?? 1), max)
            );
        }, [stepper, max]);

        const handleDecrement = useCallback(() => {
            setValue((prev) =>
                prev === undefined
                    ? -(stepper ?? 1)
                    : Math.max(prev - (stepper ?? 1), min)
            );
        }, [stepper, min]);

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (
                    document.activeElement ===
                    (ref as React.RefObject<HTMLInputElement>)?.current
                ) {
                    if (e.key === 'ArrowUp') {
                        handleIncrement();
                    } else if (e.key === 'ArrowDown') {
                        handleDecrement();
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, [handleIncrement, handleDecrement, ref]);

        useEffect(() => {
            if (controlledValue !== undefined) {
                setValue(controlledValue);
            }
        }, [controlledValue]);

        const handleChange = (values: {
            value: string;
            floatValue: number | undefined;
        }) => {
            const newValue =
                values.floatValue === undefined ? undefined : values.floatValue;
            setValue(newValue);
            formikProps.setFieldValue(props.name, newValue);
            if (onValueChange) {
                onValueChange(newValue);
            }
        };

        const handleBlur = () => {
            if (value !== undefined) {
                if (value < min) {
                    setValue(min);
                    (ref as React.RefObject<HTMLInputElement>).current!.value =
                        String(min);
                } else if (value > max) {
                    setValue(max);
                    (ref as React.RefObject<HTMLInputElement>).current!.value =
                        String(max);
                }
            }
        };
        const [field, meta] = useField(props.name as string);

        return (
            <div className="custom-input">
                <Label htmlFor={props.id} className="flex  mb-2 items-center text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                    {props.label}
                </Label>
                <NumericFormat
                    value={value}
                    onValueChange={handleChange}
                    thousandSeparator={thousandSeparator}
                    decimalScale={decimalScale}
                    fixedDecimalScale={fixedDecimalScale}
                    allowNegative={min < 0}
                    valueIsNumericString
                    onBlur={handleBlur}
                    max={max}
                    min={min}
                    suffix={suffix}
                    prefix={prefix}
                    customInput={DaisyInput ? DaisyInput : Input}
                    placeholder={placeholder}
                    getInputRef={ref}
                    className={cn(meta.touched && meta.error && props.name && 'input-field--error')}
                    {...props}
                />
                {props.name ?
                    <ErrorMessage
                        name={props.name}
                        className="validation-error"
                        component="div"
                    /> : ""}
            </div>
        );
    }
);
