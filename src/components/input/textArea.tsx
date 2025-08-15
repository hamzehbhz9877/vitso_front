'use client'
import React from 'react'
import {ErrorMessage, useField} from 'formik'
import {cn} from '@/lib/utils'
import {Textarea as TextAreaShadCn} from "@/components/ui/textarea"

type propsType = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>

interface Props extends propsType {
    label?: string | React.ReactNode
    name?: string
    icon?: React.ReactNode
}

const TextArea = ({label, name, icon, className, ...rest}: Props) => {
    const [field, meta] = useField(name as string)

    return (
        <div className="">
            {/* label */}
            {label && (
                <label className="flex mb-2 items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ">
                    {label}
                </label>
            )}

            <div className="relative">
                <TextAreaShadCn
                    {...field}
                    name={name}
                    value={meta.value}
                    className={cn(
                        // textarea specific
                        'w-full p-4 resize-none rounded-lg border border-gray-300 caret-primary-200',
                        // error
                        meta.touched && meta.error && 'border border-solid',
                        className
                    )}

                    {...rest}
                />
            </div>

            {name && (
                <ErrorMessage
                    name={name}
                    className="validation-error"
                    component="div"
                />
            )}
        </div>
    )
}

export default TextArea
