import React from "react";

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
}) {
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
