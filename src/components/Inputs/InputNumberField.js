import React from 'react';

export const InputNumberField = ({ name, value, onChange }) => {

    const handleKeyDown = (event) => {
        if (event.key === '-') {
            event.preventDefault();
        }
    }

    return (
        <input
            name={name}
            value={value}
            type="number"
            placeholder="0.00"
            onKeyDown={handleKeyDown}
            onChange={onChange}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
    );
}