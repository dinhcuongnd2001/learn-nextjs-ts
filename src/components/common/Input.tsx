"use client"

import { HTMLInputTypeAttribute} from "react";

interface IInput {
  value: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  id?: string;
}



export default function Input({value, onChange, placeholder = "", label, type = "text", id}  : IInput) {
  
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        type={type}
        value={value}
        placeholder={placeholder}
        name={`floating_${id}`}
        id={`floating_${id}`}
        className="form-input peer"
      />
      {label && (
        <label htmlFor="floating_first_name" className="form-label">
          {label}
        </label>
      )}
    </div>
  );
}
