import React from "react";

export interface CardProps {
  variant?: "flat" | "elevated" | "glass";
  padding?: "sm" | "md" | "lg";
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

/**
 * Generic surface container. `variant="glass"` is the brand's signature light
 * glassmorphism treatment — use sparingly (hero panels, floating quote card,
 * pricing cards), not on every box.
 */
export function Card({
  variant = "flat",
  padding = "md",
  interactive = false,
  className = "",
  children,
  ...rest
}: CardProps) {
  const classes = [
    "tp-card",
    `tp-card--${variant}`,
    `tp-card--pad-${padding}`,
    interactive ? "tp-card--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
