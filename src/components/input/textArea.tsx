'use client'

import React, {
    ChangeEvent, useEffect,
    useState
} from 'react'
import { useField, ErrorMessage } from 'formik'
import { cn } from '@/lib/utils'
import { Textarea as TextAreaShadCn } from '@/components/ui/textarea'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string | React.ReactNode
    name?: string
    icon?: React.ReactNode
    isShadcn?: boolean
    value?: any
}

const BaseTextArea = ({
                          label,
                          isShadcn = true,
                          className,
                          value,
                          field = {},
                          meta = {},
                          ...rest
                      }: TextAreaProps & { field?: any; meta?: any }) => {
    const finalValue = value ?? field?.value ?? ''
    const maxLength = rest.maxLength ?? undefined
    const [charCount, setCharCount] = useState(finalValue.length || 0)
    useEffect(() => {
        setCharCount(finalValue.length)
    }, [finalValue])
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        if (maxLength && newValue.length > maxLength) {
            return
        }
        field.onChange(e) // برای Formik
        setCharCount(newValue.length)
    }

    return (
        <div>
            {label && <label className="flex mb-2 gap-2 text-sm font-medium">{label}</label>}

            {isShadcn ? (
                <TextAreaShadCn
                    {...field}
                    {...rest}
                    value={finalValue}
                    onChange={handleChange}
                    className={cn(
                        'w-full p-4 text-wrap resize-none rounded-lg',
                        meta?.touched && meta?.error && 'border border-solid',
                        className
                    )}
                />
            ) : (
                <textarea
                    {...field}
                    {...rest}
                    value={finalValue}
                    onChange={handleChange}
                    className={cn(
                        'w-full p-4 text-wrap resize-none rounded-lg border border-gray-300 caret-primary-200',
                        meta?.touched && meta?.error && 'border border-solid',
                        className
                    )}
                />
            )}

            {maxLength && (
                <p className="text-xs text-muted-foreground mt-1">
                    {maxLength - charCount}/{maxLength}
                </p>
            )}

            {meta?.touched && meta?.error && (
                <ErrorMessage name={field?.name} className="validation-error" component="div" />
            )}
        </div>
    )
}

const FormikTextArea = (props: TextAreaProps) => {
    const { name, ...rest } = props
    const [field, meta] = useField(name!)
    return <BaseTextArea {...rest} field={field} meta={meta} name={name} />
}

const TextArea = (props: TextAreaProps) => {
    return props.name ? <FormikTextArea {...props} /> : <BaseTextArea {...props} />
}

export default TextArea
