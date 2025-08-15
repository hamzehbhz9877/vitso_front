'use client'

import React, { useCallback, useState } from 'react'
import Select, { Props as SelectProps } from 'react-select'
import { ErrorMessage, useField } from 'formik'

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
                         valueKey = 'id',
                         labelKey = 'name',
                         isMulti = true,
                         isClearable = true,
                         selectProps = {},
                         isSearchable = true,
                         isDisabled = false,
                         isLoading = false,
                         placeholder = 'لطفا مقداری را وارد کنید...'
                     }: Props) => {
    const [inputValue, setInputValue] = useState<string>('')

    const labelizeData = useCallback(
        (items: any[]): OptionType[] => {
            return items?.map((item) => ({
                value: item[valueKey],
                label: item[labelKey]
            }))
        },
        [valueKey, labelKey]
    )

    const [field, meta] = useField(name as string)

    const options = labelizeData(data)

    const handleChange = useCallback(
        (selected: any) => {
            if (isMulti) {
                const ids = selected?.map((item: any) => item.value) ?? []
                formikProps.setFieldValue(name, ids)
            } else {
                formikProps.setFieldValue(name, selected?.value || '')
            }
        },
        [formikProps, name, isMulti]
    )

    const getValue = () => {
        const currentValue = formikProps.values[name]
        if (isMulti) {
            return options.filter((option) => currentValue?.includes(option.value))
        } else {
            return options.find((option) => option.value === currentValue) || null
        }
    }

    return (
        <div className="">
            <label
                htmlFor={name}
                className="flex items-center mb-2 gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            >
                {title}
            </label>

            <Select
                instanceId={`multi-select-${name}`}
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
                    IndicatorSeparator: () => null
                }}
                noOptionsMessage={() => 'هیچ گزینه‌ای یافت نشد'}
                unstyled
                classNames={{
                    control: ({ isFocused }) =>
                        `flex w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors 
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
                        `cursor-pointer px-2 text-foreground  rounded-sm py-1 ${
                            isSelected
                                ? 'bg-neutral-200 text-neutral-900 dark:bg-neutral-600 dark:text-white'
                                : isFocused
                                    ? 'bg-neutral-100 dark:bg-neutral-700'
                                    : ''
                        }`,
                    menu: () =>
                        'bg-white dark:bg-neutral-950 border rounded shadow-md mt-1 z-50',
                    menuList: () => 'max-h-48 overflow-auto p-1 text-[14px]'
                }}
                {...selectProps}
            />

            {name && (
                <ErrorMessage
                    name={name}
                    className="text-red-500 text-xs mt-1"
                    component="div"
                />
            )}
        </div>
    )
}

export default MultiSelect
