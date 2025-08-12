'use client';
import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState
} from 'react';
import { useField } from 'formik';

// css
import './index.scss';
import { cn } from '@/lib/utils';

type propsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

interface Props extends propsType {
    type: 'text' | 'number' | 'email' | 'password' | 'hidden' | 'url'|'tel';
    label?: string | React.ReactNode;
    name?: string;
    showError?: boolean;
    prefix?: string;
    icon?: React.ReactNode;
}

// تابع کمکی برای تبدیل مقدار به رشته مناسب برای input
function safeInputValue(value: any): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
}

const SimpleInput = ({
                         type,
                         showError = true,
                         label,
                         prefix,
                         name,
                         icon,
                         className,
                         value: propsValue,
                         ...rest
                     }: Props) => {
    // فقط اگر name داده شده بود useField اجرا کن، وگرنه مقدار پیش‌فرض بده
    const [field, meta] = name ? useField(name) : [{}, {}];

    const prefixRef = useRef<HTMLSpanElement>(null);
    const [prefixWidth, setPrefixWidth] = useState(0);

    useEffect(() => {
        if (prefixRef.current) {
            const width = prefixRef.current.offsetWidth;
            setPrefixWidth(width + 14); // اضافه کردن فاصله بین prefix و input
        }
    }, [prefix]);

    // مقدار نهایی که به input می‌دهیم:
    // اولویت با propsValue است، اگر نبود مقدار فرم، و اگر نبود رشته خالی
    const finalValue = safeInputValue(
        propsValue !== undefined && propsValue !== null ? propsValue : (field.value ?? '')
    );

    return (
        <div className="custom-input simple">
            {label && <label className="custom-input__title dark:!text-base-content">{label}</label>}

            <div className="relative custom-input__wrapper">
                {prefix && (
                    <span ref={prefixRef} className="custom-input__prefix dark:!bg-base-300 dark:!text-base-content">
                        {prefix}
                    </span>
                )}

                <input
                    {...field}
                    {...rest}
                    type={type}
                    name={name}
                    className={cn(
                        'input-field dark:!bg-base-300 dark:!text-base-content',
                        icon && 'input-has-icon',
                        prefix && 'input-has-prefix',
                        meta.touched && meta.error && 'input-field--error',
                        className
                    )}
                    style={{
                        paddingLeft: prefix ? `${prefixWidth}px` : undefined
                    }}
                    value={finalValue}
                />

                {icon && <div className="custom-input__icon">{icon}</div>}
            </div>

            {showError && meta.touched && meta.error && (
                <div className="validation-error">{meta.error}</div>
            )}
        </div>
    );
};

export default SimpleInput;
