'use client';
import React from 'react';
import {ErrorMessage, useField} from "formik";


// css
import "./index.scss"

type propsType = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

interface Props extends propsType {
    label?: string | React.ReactNode;
    name?: string;
    icon?: React.ReactNode
}


const TextArea = ({label, name, icon, className, ...rest}: Props) => {



    const [field, meta] = useField(name as string);

    return (
        <div className="custom-input simple">
            {
                label ? <label className="custom-input__title dark:!text-base-content">{label}</label> : ""
            }


            <div className="relative">
                <textarea
                    name={name}
                    value={meta.value}
                    onChange={field.onChange}
                    className={`input-field dark:!bg-base-300 dark:!text-base-content w-full p-4 resize-none rounded-lg border border-gray-300 caret-primary-200 ${meta.touched && meta.error ? 'input-field--error' : ""} ${className ?? ""}`}
                    {...rest}
                >

                </textarea>
            </div>

            { name ? <ErrorMessage name={name} className="validation-error" component="div"/> : ""
            }
        </div>
    );
};

export default TextArea;