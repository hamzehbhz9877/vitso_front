'use client'

import React, { useCallback, useState } from 'react';
import Select from "react-select";
import {ErrorMessage, useField} from "formik";
import { Props as SelectProps } from 'react-select';

type OptionType = {
    value: string | number
    label: string
    [key: string]: any
}

type Props = {
    formikProps: any
    title: string
    name: string
    data?: any[]
    valueKey?: string
    labelKey?: string
    selectProps?: SelectProps<OptionType, boolean>
    isMulti?: boolean
    isClearable?: boolean
    isSearchable?: boolean
    isDisabled?: boolean
    isLoading?: boolean
    placeholder?: string
}

const MultiSelect = ({
                         title,
                         formikProps,
                         name,
                         data = [],
                         valueKey = "id",
                         labelKey = "name",
                         isMulti = true,
                         isClearable = true,
                         selectProps = {},
                         isSearchable = true,
                         isDisabled = false,
                         isLoading = false,
                         placeholder = "لطفا مقداری را وارد کنید..."
                     }: Props) => {
    const [inputValue, setInputValue] = useState<string>("");

    const labelizeData = useCallback((items: any[]): OptionType[] => {
        return items?.map((item) => ({
            value: item[valueKey],
            label: item[labelKey],
        }));
    }, [valueKey, labelKey]);
    const [field, meta] = useField(name as string);

    const options = labelizeData(data);

    const handleChange = useCallback((selected: any) => {
        if (isMulti) {
            const ids = selected?.map((item: any) => item.value) ?? [];
            formikProps.setFieldValue(name, ids);
        } else {
            formikProps.setFieldValue(name, selected?.value || '');
        }
    }, [formikProps, name, isMulti]);

    const getValue = () => {
        const currentValue = formikProps.values[name];
        if (isMulti) {
            return options.filter(option => currentValue?.includes(option.value));
        } else {
            return options.find(option => option.value === currentValue) || null;
        }
    };

    return (
        <div className="form-group text-[#8D8D8D]">
            <label htmlFor={name} className="block mb-2 text-sm font-medium">
                {title}
            </label>

            <Select
                instanceId={`multi-select-${name}`}  // این خط را اضافه کنید
                isMulti={isMulti}
                isClearable={isClearable}
                isSearchable={isSearchable}
                isDisabled={isDisabled}
                isLoading={isLoading}
                options={options}
                placeholder={placeholder}
                inputValue={inputValue}
                onInputChange={setInputValue}
                onChange={handleChange}
                value={getValue()}
                name={name}
                components={{
                    IndicatorSeparator: () => null,  // این خط separator رو حذف میکنه
                }}
                noOptionsMessage={() => "هیچ گزینه‌ای یافت نشد"}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        backgroundColor: "#ffffff",
                        border: "1px solid",
                        borderColor: (meta.touched && meta.error && name) ? '#f00 !important': state.isFocused ? "#000000 !important" : "#e0e0e2 !important",
                        paddingTop: "2px",
                        marginTop: "11px",
                        paddingBottom: "2px",
                        paddingLeft: "10px",
                        paddingRight: "0px",
                        fontSize: "14px",
                        color: "#030a16",
                        width: "100%",
                        lineHeight: "1.5rem",
                        borderRadius: "0px",
                        boxShadow: "none",
                        "&:hover": {
                            borderColor: state.isFocused ? "#000000" : "#e0e0e2",
                        },
                    }),
                    input: (base) => ({
                        ...base,
                        color: "#030a16",
                        fontSize: "14px",
                    }),
                    placeholder: (base) => ({
                        ...base,
                        fontSize: "14px",
                        color: "#999999",
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#f0f0f0",
                        fontSize:"13px",
                        borderRadius: "6px",
                        padding: "0px 4px",
                        margin: "0px 5px",
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        fontSize: "14px",
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: '#ffffff',  // پس‌زمینه منو
                        borderRadius: '4px',
                        boxShadow: '0 4px 11px rgba(0,0,0,0.1)', // سایه ملایم
                        marginTop: 4,
                    }),
                    menuList: (base) => ({
                        ...base,
                        maxHeight: '200px',
                        paddingTop: 0,
                        paddingBottom: 0,
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? '#e8f0fe' : 'transparent',  // رنگ پس‌زمینه گزینه هنگام هاور یا انتخاب
                        color: state.isSelected ? '#1a73e8' : '#333',  // رنگ متن گزینه انتخاب شده
                        cursor: 'pointer',
                        padding: '8px 12px',
                    }),
                }}
                {...selectProps}
            />
            {name?
            <ErrorMessage
                name={name}
                className="validation-error"
                component="div"
            />:""}
        </div>
    );
};

export default MultiSelect;
