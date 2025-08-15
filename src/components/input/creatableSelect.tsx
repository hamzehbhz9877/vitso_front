'use client'

import React, { useCallback, useState } from 'react'
import { ErrorMessage, FormikProps, useField } from 'formik'
import CreatableSelect from 'react-select/creatable'
import { components } from 'react-select'
import { asObjectArray } from '@/lib/utils'
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


    return (
        <div className={"form-group grid gap-2"}>
            <label
                htmlFor={name}
                className="flex items-center  gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
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
                placeholder="کلمات کلیدی را وارد کنید"
                menuIsOpen={showDropdown ? undefined : false}
                components={{
                    DropdownIndicator: (props) =>
                        !showDropdown ? null : <components.DropdownIndicator {...props} />,
                    IndicatorSeparator: () => null,
                    ...selectProps.components,
                }}
                unstyled
                classNames={{
                    control: ({ isFocused }) =>
                        `flex w-full   rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors 
            placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 
            disabled:cursor-not-allowed disabled:opacity-50 md:text-sm 
            ${
                            meta.touched && meta.error
                                ? 'focus-visible:ring-red-500'
                                : isFocused
                                    ? 'border focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300'
                                    : 'border'
                        }
            dark:file:text-neutral-50 dark:placeholder:text-neutral-400`,
                    placeholder: () => 'text-neutral-500 text-sm',


                    multiValue: () =>
                        'bg-neutral-100 dark:bg-neutral-700 rounded px-1 py-0.5 m-0.5',
                    multiValueLabel: () => 'text-sm',
                    multiValueRemove: () =>
                        'hover:bg-red-500 hover:text-white rounded-full p-0.5 mr-1 transition-colors cursor-pointer',
                    option: ({ isFocused, isSelected }) =>
                        `cursor-pointer px-2 rounded-sm py-1  ${
                            isSelected
                                ? 'bg-neutral-200 text-neutral-900 dark:bg-neutral-600 dark:text-white'
                                : isFocused
                                    ? 'bg-neutral-100 dark:bg-neutral-700'
                                    : ''
                        }`,
                    menu: () =>
                        'bg-white dark:bg-neutral-950 border  rounded shadow-md mt-1 z-50',
                    menuList: () => 'max-h-48 overflow-auto p-1 text-[14px]',

                    input: () => 'm-0 p-0 text-base h-auto text-black dark:text-white',
                    valueContainer: () => 'flex flex-wrap gap-1 p-0',
                    clearIndicator: () => 'current-color text-neutral-500',
                    dropdownIndicator:()=>'text-neutral-500'
                }}
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