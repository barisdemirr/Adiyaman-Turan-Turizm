"use client";

import React, { useState, useEffect } from 'react';

const CustomSelect = ({ options, label, onSelect, placeholder = "Seçiniz...", value, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (value === null) setSelectedOption(null);
    }, [value]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className={`relative w-full transition-opacity duration-300 ${disabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}

            {/* Seçili Alan */}
            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`w-full bg-white border border-slate-200 rounded-xl px-4 py-3 flex justify-between items-center shadow-sm
          ${disabled ? 'cursor-not-allowed bg-slate-50' : 'cursor-pointer hover:border-orange-500'}`}
            >
                <span className={selectedOption ? "text-slate-900" : "text-slate-400"}>
                    {selectedOption ? selectedOption.name : placeholder}
                </span>
                <span className={`material-symbols-outlined transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </div>

            {/* Dropdown Menü */}
            {isOpen && (
                <ul className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl max-h-60 overflow-y-auto reveal visible">
                    {options.length > 0 ? (
                        options.map((option) => (
                            <li
                                key={option.id}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-3 hover:bg-orange-50 cursor-pointer text-slate-700 transition-colors border-b border-slate-50 last:border-none"
                            >
                                {option.name}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-3 text-slate-400 italic">Veri yükleniyor...</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;