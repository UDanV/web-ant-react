import React from "react";

type FilterMobileButtonProps = {
    onClick: () => void;
};

export const FilterMobileButton: React.FC<FilterMobileButtonProps> = ({ onClick }) => {

    return (
        <button
            onClick={onClick}
            className="md:hidden w-full max-w-md mx-auto my-4 px-4 py-3 flex items-center justify-center gap-2.5 bg-blue-50 text-blue-500 font-bold uppercase rounded shadow-sm border-none cursor-pointer"
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Advanced Filters
        </button>
    )
}