import React, { type ChangeEvent } from "react";

const arrowIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"/>
    </svg>
);

type SelectOption = {
    value: string;
    label: string;
};

type SelectProps = {
    options: SelectOption[];
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = ({
                                                  options,
                                                  value,
                                                  onChange,
                                                  placeholder,
                                                  className = '',
                                                  ...props
                                              }) => {
    return (
        <div className={`relative w-full ${className}`}>
            <select
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 pr-10 border text-gray-500 border-gray-300 rounded-lg bg-white shadow-sm appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer"
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                {arrowIcon}
            </div>
        </div>
    );
};