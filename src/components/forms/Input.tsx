import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  suffix?: React.ReactNode;
  mono?: boolean;
  className?: string;
}

/** Single-line text input with optional label and trailing unit/suffix slot. */
export function Input({
  label,
  placeholder,
  type = "text",
  suffix,
  mono = false,
  disabled = false,
  className = "",
  ...rest
}: InputProps) {
  return (
    <label className={["tp-field", className].filter(Boolean).join(" ")}>
      {label ? <span className="tp-field__label">{label}</span> : null}
      <span className="tp-field__control">
        <input
          className={["tp-input", mono ? "tp-input--mono" : ""].filter(Boolean).join(" ")}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
        {suffix ? <span className="tp-field__suffix">{suffix}</span> : null}
      </span>
    </label>
  );
}
