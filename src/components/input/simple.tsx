'use client'
import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState
} from 'react'
import { useField } from 'formik'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

type propsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

interface Props extends propsType {
    type: 'text' | 'number' | 'email' | 'password' | 'hidden' | 'url' | 'tel'
    label?: string | React.ReactNode
    name?: string
    showError?: boolean
    prefix?: string
    icon?: React.ReactNode
}

function safeInputValue(value: any): string {
    if (value === null || value === undefined) return ''
    if (typeof value === 'object') return JSON.stringify(value)
    return String(value)
}

// بیس اینپوت که وابستگی به فرومیک نداره
const BaseInput = ({
                       type,
                       showError = true,
                       label,
                       prefix,
                         name,
                       icon,
                       className,
                       value,
                       meta,
                       field,
                       ...rest
                   }: Props & { field: any; meta: any }) => {
    const prefixRef = useRef<HTMLSpanElement>(null)
    const [prefixWidth, setPrefixWidth] = useState(0)

    useEffect(() => {
        if (prefixRef.current) {
            const width = prefixRef.current.offsetWidth
            setPrefixWidth(width + 14)
        }
    }, [prefix])

    const finalValue = safeInputValue(value ?? field.value ?? '')

    return (
        <div className="form-group grid gap-2">
            {label && (
                <label className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                    {label}
                </label>
            )}

            <div className="relative flex items-center">
                {prefix && (
                    <span
                        style={{direction:"ltr"}}
                        ref={prefixRef}
                        className="absolute text-[13px] text-gray-500 pointer-events-none whitespace-nowrap left-[4px] top-1/2 -translate-y-1/2 direction-ltr
                   bg-blue-50 h-[calc(100%-8px)] px-2 flex items-center
                   dark:bg-neutral-700 dark:text-gray-300 dark:border dark:border-neutral-600"
                    >
        {prefix}
    </span>
                )}

                <Input
                    {...field}
                    {...rest}
                    type={type}
                    className={cn(
                        icon && 'pr-[35px]',
                        prefix && 'text-left',
                        name === 'phone' && 'text-left',
                        meta?.touched && meta?.error && 'border border-solid',
                        className
                    )}
                    style={{
                        paddingLeft: prefix ? `${prefixWidth}px` : undefined
                    }}
                    value={finalValue}
                />

                {icon && (
                    <div className="absolute -translate-y-2/4 right-2.5 top-2/4">
                        {icon}
                    </div>
                )}
            </div>

            {showError && meta?.touched && meta?.error && (
                <div className="text-right text-xs text-red-500 mt-[5px]">
                    {meta.error}
                </div>
            )}
        </div>
    )
}

// نسخه‌ای که با Formik وصل میشه
const FormikInput = (props: Props & { name: string }) => {
    const [field, meta] = useField(props.name)
    return <BaseInput {...props} field={field} meta={meta} />
}

// ورودی اصلی
const SimpleInput = (props: Props) => {
    if (!props.name) {
        return <BaseInput {...props} field={{}} meta={{}} />
    }
    return <FormikInput {...props as Props & { name: string }} />
}

export default SimpleInput
