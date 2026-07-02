import React from "react";

export interface FormatChipProps {
  children?: React.ReactNode;
  className?: string;
}

/** Small chip for file-format names, rendered in monospace — the "лента форматов". */
export function FormatChip({ children, className = "" }: FormatChipProps) {
  return <span className={["tp-format-chip", className].filter(Boolean).join(" ")}>{children}</span>;
}
