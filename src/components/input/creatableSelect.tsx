'use client'

import React, { useCallback, useState } from 'react'
import { ErrorMessage, FormikProps, useField } from 'formik'
import CreatableSelect from 'react-select/creatable'
import { components } from 'react-select'
import { asObjectArray } from '@/lib/utils'
import customDefaultStyles from '@/components/input/customCreatableSelectStyles'
import  { Props as SelectProps } from 'react-select';

interface CustomCreatableSelectProps {
    data?: any[]
    formikProps: FormikProps<any>
    showDropdown?: boolean
    options?: { label: string; value: string }[]
    selectProps?:  SelectProps<{
        label: string;
        value: string;
    }, true> & {
        onCreateOption?: (inputValue: string) => void;
        menuIsOpen?: boolean;
        components?: any;
    };
    customStyles?: any
    name: string
    valueKey?: string
    labelKey?: string
    fieldLabel?: string
    onChange?: (values: string[]) => void
}

const CustomCreatableSelect = ({
                                   data = [],
                                   formikProps,
                                   showDropdown = false,
                                   options = [],
                                   selectProps = {},
                                   customStyles = {},
                                   fieldLabel = 'برچسب‌ها',
                                   name,
                                   valueKey = 'id',
                                   labelKey = 'name',
                                   onChange,
                               }: CustomCreatableSelectProps) => {
    const [inputValue, setInputValue] = useState('')
    const [field, meta] = useField(name)

    const currentValues: string[] = formikProps.values[name] || []

    // گزینه‌های پایه از options یا data
    const baseOptions = options.length
        ? options
        : Array.isArray(data)
            ? asObjectArray(data, valueKey, labelKey)
            : []

    // گزینه‌های ساخته شده توسط کاربر
    const [createdOptions, setCreatedOptions] = useState<{ label: string; value: string }[]>([])

    // ترکیب گزینه‌ها (پایه + ساخته شده)
    const combinedOptions = [
        ...baseOptions,
        ...createdOptions.filter(
            (co) => !baseOptions.find((bo) => bo.value === co.value)
        ),
    ]

    const handleSelectKeywords = useCallback(
        (selected: any) => {
            const updated = selected?.map((item: any) => item.value) || []
            formikProps.setFieldValue(name, updated)
            if (onChange) onChange(updated)
        },
        [formikProps, name, onChange]
    )

    const handleCreateOption = (input: string) => {
        const newOption = { label: input, value: input }
        setCreatedOptions((prev) => [...prev, newOption])
        const current = formikProps.values[name] || []
        const updated = [...current, input]
        formikProps.setFieldValue(name, updated)
        if (onChange) onChange(updated)
        setInputValue('')
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!inputValue) return
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault()
            const current = formikProps.values[name] || []
            if (!current.includes(inputValue)) {
                const newOption = { label: inputValue, value: inputValue }
                setCreatedOptions((prev) => [...prev, newOption])
                const updated = [...current, inputValue]
                formikProps.setFieldValue(name, updated)
                if (onChange) onChange(updated)
            }
            setInputValue('')
        }
    }

    const getValue = () => {
        return currentValues.map((val) => ({ label: val, value: val }))
    }

    const styles = { ...customDefaultStyles(meta), ...customStyles }

    return (
        <div>
            <label
                htmlFor={name}
                className="text-[13px] leading-[21px] text-[#62666d] block mb-[10px]"
            >
                {fieldLabel}
            </label>

            <CreatableSelect
                instanceId={`multi-select-${name}`}  // این خط را اضافه کنید
                isMulti
                isClearable
                inputValue={inputValue}
                value={getValue()}
                options={combinedOptions}
                onInputChange={setInputValue}
                onChange={handleSelectKeywords}
                onCreateOption={handleCreateOption}
                onKeyDown={showDropdown ? undefined : handleKeyDown}
                placeholder="کلمات کلیدی را وارد کنید و Enter را بزنید"
                menuIsOpen={showDropdown ? undefined : false}
                components={{
                    DropdownIndicator: (props) =>
                        !showDropdown ? null : <components.DropdownIndicator {...props} />,
                    IndicatorSeparator: () => null,
                    ...selectProps.components,
                }}
                styles={styles}
                noOptionsMessage={() => 'موردی پیدا نشد. با Enter اضافه کنید.'}
                {...selectProps}
            />

            {name && (
                <ErrorMessage name={name} className="validation-error" component="div" />
            )}
        </div>
    )
}

export default CustomCreatableSelect
