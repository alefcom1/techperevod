import React from "react";

/**
 * Small pill label — plan highlights ("Популярный"), status tags, counts.
 */
export function Badge({ tone = "neutral", size = "md", children, className = "" }) {
  const classes = ["tp-badge", `tp-badge--${tone}`, `tp-badge--${size}`, className]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}
