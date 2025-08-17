'use client'

import React, {DetailedHTMLProps, InputHTMLAttributes, useEffect, useRef, useState} from 'react'
import {useField, useFormikContext, ErrorMessage} from 'formik'
import {cn} from '@/lib/utils'
import {Input} from '@/components/ui/input'
import {Textarea as TextAreaShadCn} from '@/components/ui/textarea'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string | React.ReactNode
    name?: string
    icon?: React.ReactNode
    isShadcn?: boolean
    value?: any
}

const BaseTextArea = ({label, isShadcn = true, className, value, field = {}, meta = {}, ...rest}: TextAreaProps & {
    field?: any;
    meta?: any
}) => {
    const finalValue = value ?? meta?.value ?? ''

    return (
        <div>
            {label && <label className="flex mb-2 gap-2 text-sm font-medium">{label}</label>}

            {isShadcn ? (
                <TextAreaShadCn
                    {...field}
                    value={finalValue}
                    className={cn(
                        'w-full p-4 resize-none rounded-lg border border-gray-300 caret-primary-200',
                        meta?.touched && meta?.error && 'border border-solid',
                        className
                    )}
                    {...rest}
                />
            ) : (
                <textarea
                    {...field}
                    value={finalValue}
                    className={cn(
                        'w-full p-4 resize-none rounded-lg border border-gray-300 caret-primary-200',
                        meta?.touched && meta?.error && 'border border-solid',
                        className
                    )}
                    {...rest}
                />
            )}

            {meta?.touched && meta?.error &&
                <ErrorMessage name={field?.name} className="validation-error" component="div"/>}
        </div>
    )
}

const FormikTextArea = (props: TextAreaProps) => {
    const {name, ...rest} = props
    const [field, meta] = useField(name)

    return <BaseTextArea {...rest} field={field} meta={meta} name={name}/>
}

 const TextArea = (props: TextAreaProps) => {
    return props.name ? <FormikTextArea {...props} /> : <BaseTextArea {...props} />
}
export default TextArea
