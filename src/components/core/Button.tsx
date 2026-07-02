import React from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  disabled?: boolean;
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

/**
 * Primary interactive control. Solid primary for the main conversion action
 * (e.g. "Загрузить документ"), ghost/secondary for lower-emphasis actions.
 * When `as="a"` and `href` is internal, renders a next/link for client nav.
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
}: ButtonProps) {
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
      {icon && iconPosition === "left" ? <span className="tp-btn__icon">{icon}</span> : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? <span className="tp-btn__icon">{icon}</span> : null}
    </>
  );

  if (as === "a") {
    const isInternal = href && href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className={classes} aria-disabled={disabled} {...rest}>
          {content}
        </Link>
      );
    }
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
