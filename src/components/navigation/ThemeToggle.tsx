"use client";

import React from "react";

export interface ThemeToggleProps {
  theme?: "light" | "dark";
  onChange?: (theme: "light" | "dark") => void;
  className?: string;
}

/** Light/dark segmented toggle switch, mirrors data-tp-theme. */
export function ThemeToggle({ theme = "light", onChange, className = "" }: ThemeToggleProps) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className={["tp-theme-toggle", isDark ? "tp-theme-toggle--dark" : "", className]
        .filter(Boolean)
        .join(" ")}
      role="switch"
      aria-checked={isDark}
      aria-label="Переключить тему"
      onClick={() => onChange && onChange(isDark ? "light" : "dark")}
    >
      <span className="tp-theme-toggle__icon">☾</span>
      <span className="tp-theme-toggle__icon">☀</span>
      <span className="tp-theme-toggle__thumb" />
    </button>
  );
}
