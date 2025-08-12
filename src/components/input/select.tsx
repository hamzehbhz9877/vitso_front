import React from 'react';
import {useField, ErrorMessage, FormikProps} from 'formik';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import {Label} from "@/components/ui/label";

type SelectProps = {
    label: string;
    options: { value: string; label: string }[]; // داینامیک کردن گزینه‌ها
    icon?: React.ReactNode; // آیکون دلخواه
    value?: string; // مقدار انتخاب شده
    onChange?: (value: string) => void; // هندلر تغییر
    name: string; // نام فیلد برای فرمیک
    placeholder?: string;
    formikProps:FormikProps<any>;
};

export default function SelectWithCustomDropdownIconDemo({
                                                             label,
                                                             options,
                                                             icon = <ChevronDown className="h-4 w-4 opacity-50" />,
                                                             value,
                                                             onChange,
                                                             formikProps,
                                                             placeholder='انتخاب کنید...',
                                                             name,
                                                         }: SelectProps) {
    const [field, meta] = useField(name); // استفاده از useField برای مدیریت ارور و وضعیت فیلد

    return (
        <div>
            <Label className="custom-input__title">{label}</Label>
            <Select value={value}  dir={"rtl"} onValueChange={(data)=>formikProps.setFieldValue(name,data)}>
                <SelectPrimitive.Trigger
                    className={cn(
                        "flex w-full items-center justify-between whitespace-nowrap"+
                        "focus:outline-none [&>span]:line-clamp-1" ,
                        "input-field",
                        meta.touched && meta.error && 'input-field--error'
                    )}
                >
                    <SelectValue placeholder={placeholder} />
                    <SelectPrimitive.Icon asChild>{icon}</SelectPrimitive.Icon>
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
            <ErrorMessage name={name} className="validation-error text-red-500 text-sm" component="div" />
        </div>
    );
}
