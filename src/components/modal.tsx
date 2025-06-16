import React from "react";

type ModalProps = {
    onClose: () => void;
    children: React.ReactNode;
    onApply?: () => void;
    applyText?: string;
};

export const Modal: React.FC<ModalProps> = ({
                                                onClose,
                                                children,
                                                onApply,
                                                applyText = 'Apply'
                                            }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl uppercase font-semibold">Advanced Filters</h2>
                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>

                <div className="space-y-4">
                    {children}
                </div>

                {onApply && (
                    <button
                        onClick={onApply}
                        className="w-full mt-6 bg-blue-50 py-3 text-blue-500 uppercase rounded font-medium hover:bg-blue-600 transition-colors"
                    >
                        {applyText}
                    </button>
                )}
            </div>
        </div>
    );
};