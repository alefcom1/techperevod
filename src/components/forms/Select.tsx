import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

/** Native <select> styled to match Input — same tp-field/tp-input shell. */
export function Select({ label, options, placeholder, className = "", ...rest }: SelectProps) {
  return (
    <label className={["tp-field", className].filter(Boolean).join(" ")}>
      {label ? <span className="tp-field__label">{label}</span> : null}
      <span className="tp-field__control">
        <select className="tp-input tp-select" {...rest}>
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}
