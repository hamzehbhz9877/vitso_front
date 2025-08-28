'use client'
import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState
} from 'react'
import { ErrorMessage, useField } from 'formik'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import DaisyInput from "@/components/input/daisyInput"; // Shadcn Input

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
    isShadcnInput?: boolean // پراپس جدید
}

function safeInputValue(value: any): string {
    if (value === null || value === undefined) return ''
    if (typeof value === 'object') return JSON.stringify(value)
    return String(value)
}

// بیس اینپوت (بدون وابستگی مستقیم به Formik)
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
                       isShadcnInput = true,
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

    const finalValue = safeInputValue(value ?? field?.value ?? '')

    return (
        <div className='simple-input'>
            {label && (
                <label className='flex mb-2 items-center gap-2 text-sm leading-none font-medium select-none'>
                    {label}
                </label>
            )}

            <div className='relative flex items-center'>
                {prefix && (
                    <span
                        style={{ direction: 'ltr' }}
                        ref={prefixRef}
                        className='absolute text-[13px] text-gray-500 pointer-events-none whitespace-nowrap left-[4px] top-1/2 -translate-y-1/2 bg-blue-50 h-[calc(100%-8px)] px-2 flex items-center dark:bg-neutral-700 dark:text-gray-300 dark:border dark:border-neutral-600'
                    >
            {prefix}
          </span>
                )}

                {isShadcnInput ? (
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
                ) : (
                    <DaisyInput
                        {...field}
                        {...rest}
                        type={type}
                        className={cn(
                            'input input-bordered w-full', // DaisyUI input
                            icon && 'pr-[35px]',
                            prefix && 'text-left',
                            name === 'phone' && 'text-left',
                            meta?.touched && meta?.error && 'input-error',
                            className
                        )}
                        style={{
                            paddingLeft: prefix ? `${prefixWidth}px` : undefined
                        }}
                        value={finalValue}
                    />
                )}

                {icon && (
                    <div className='absolute -translate-y-2/4 right-2.5 top-2/4'>
                        {icon}
                    </div>
                )}
            </div>

            {name && showError && (
                <ErrorMessage name={name} className='validation-error' component='div' />
            )}
        </div>
    )
}

const FormikInput = (props: Props & { name: string }) => {
    const [field, meta] = useField(props.name)
    return <BaseInput {...props} field={field} meta={meta} />
}

// ورودی اصلی
const SimpleInput = (props: Props) => {
    if (!props.name) {
        return <BaseInput {...props} field={{}} meta={{}} />
    }
    return <FormikInput {...(props as Props & { name: string })} />
}

export default SimpleInput
