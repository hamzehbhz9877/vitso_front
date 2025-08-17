import React from 'react';
import {useField, ErrorMessage, FormikProps} from 'formik';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import {X,ChevronDown} from "lucide-react";
import {Label} from "@/components/ui/label";

type Props = SelectPrimitive.SelectProps & {
    label: string;
    options: { value: string; label: string }[];
    formikProps: FormikProps<any>;
    name: string;
    icon?: React.ReactNode;
    placeholder?: string;
    onChange?: (value:string)=>void;
    isClearable?: boolean;
};

export default function SelectWithCustomDropdownIconDemo({
                                                             label,
                                                             options,
                                                             icon = <ChevronDown className="h-4 w-4 opacity-50"/>,
                                                             value,
                                                             onChange,
                                                             formikProps,
                                                             isClearable,
                                                             placeholder = 'انتخاب کنید...',
                                                             name,
    ...rest
                                                         }: Props) {
    const [field, meta] = useField(name); // استفاده از useField برای مدیریت ارور و وضعیت فیلد

    const handleClear = () => {
        formikProps.setFieldValue(name, '');
        if (onChange) {
            onChange('')
        }
    };

    return (
        <div className={""}>
            <Label
                className="flex mb-2 items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">{label}</Label>
            <Select value={value} dir={"rtl"} onValueChange={(data) => {
                formikProps.setFieldValue(name, data)
                if (onChange)
                onChange(data)
            }}
                    {...rest}
            >
                <SelectPrimitive.Trigger
                    className={cn(
                        "flex w-full items-center justify-between whitespace-nowrap" +
                        "focus:outline-none [&>span]:line-clamp-1",
                        "flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-base shadow-sm " +
                        "transition-colors text-neutral-500 focus-visible:outline-none focus-visible:ring-1 " +
                        "focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " +
                        "dark:border-neutral-800 dark:text-neutral-400" +
                        "dark:focus-visible:ring-neutral-300",
                        meta.touched && meta.error && 'input-field--error'
                    )}
                >
                    <SelectValue placeholder={placeholder}/>
                    <div className={"flex"}>
                        {/*<SelectPrimitive.Icon asChild> {isClearable && field.value && (*/}
                        {/*    <X*/}
                        {/*        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer opacity-50 hover:opacity-100"*/}
                        {/*        onClick={handleClear}*/}
                        {/*    />*/}
                        {/*)}</SelectPrimitive.Icon>*/}
                        <SelectPrimitive.Icon asChild>{icon}</SelectPrimitive.Icon>
                    </div>

                </SelectPrimitive.Trigger>
                <SelectContent>
                    <SelectGroup>
                        {/*<SelectLabel>{label}</SelectLabel>*/}
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* نمایش ارور مربوط به فیلد */}
            <ErrorMessage name={name} className="validation-error" component="div"/>
        </div>
    );
}
