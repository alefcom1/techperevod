import React from "react";

export interface BadgeProps {
  tone?: "neutral" | "primary" | "accent";
  size?: "sm" | "md";
  className?: string;
  children?: React.ReactNode;
}

/** Small pill label — plan highlights ("Популярный"), status tags, counts. */
export function Badge({ tone = "neutral", size = "md", children, className = "" }: BadgeProps) {
  const classes = ["tp-badge", `tp-badge--${tone}`, `tp-badge--${size}`, className]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}
