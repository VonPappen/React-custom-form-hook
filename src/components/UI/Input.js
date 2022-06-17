import React from "react";

export default function Input(props) {
    const { label, type, name, handleChange, errorMessage, isValid, value } =
        props;
    return (
        <div>
            <label htmlFor="">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
            />
            {errorMessage && !isValid && (
                <span className="">{errorMessage}</span>
            )}
        </div>
    );
}
