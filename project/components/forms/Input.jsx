import React from "react";

/** Single-line text input with optional label and leading unit/icon slot. */
export function Input({
  label,
  placeholder,
  type = "text",
  suffix,
  mono = false,
  disabled = false,
  className = "",
  ...rest
}) {
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
