import React from "react";

/**
 * Primary interactive control. Solid primary for the main conversion action
 * (e.g. "Загрузить документ"), ghost/secondary for lower-emphasis actions.
 */
export function Button({
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "left",
  fullWidth = false,
  disabled = false,
  as = "button",
  href,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "tp-btn",
    `tp-btn--${variant}`,
    `tp-btn--${size}`,
    fullWidth ? "tp-btn--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "left" ? (
        <span className="tp-btn__icon">{icon}</span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? (
        <span className="tp-btn__icon">{icon}</span>
      ) : null}
    </>
  );

  if (as === "a") {
    return (
      <a href={href} className={classes} aria-disabled={disabled} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
