'use client'
import React, {useState, ChangeEvent, InputHTMLAttributes} from 'react';
import useQueryParams from "@/hooks/useQueryParams";
import {useSearchParams} from "next/navigation";

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange?: (checked: boolean) => void;
    label?: string;
    query: string;
}

const ToggleFilter: React.FC<ToggleProps> = ({onChange, query, label = '', ...props}) => {
    const [checked, setChecked] = useState(false);
    const {addQueryParam, removeQueryParam} = useQueryParams()

    const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked;
        setChecked(newValue);
        if (newValue === false)
            removeQueryParam(query)
        else
            addQueryParam(query, newValue)
    };

    return (
        <label className="flex items-center gap-2 p-2 border-gray-300 rounded-md cursor-pointer">
            <input
                type="checkbox"
                className="toggle toggle-primary toggle-lg"
                checked={checked}
                onChange={handleToggle}
                {...props}
            />
            <span className="font-bold">{label}</span>
        </label>
    );
};

export default ToggleFilter;
