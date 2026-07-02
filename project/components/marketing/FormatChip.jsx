import React from "react";

/** Small chip for file-format names, rendered in monospace — the "лента форматов". */
export function FormatChip({ children, className = "" }) {
  return <span className={["tp-format-chip", className].filter(Boolean).join(" ")}>{children}</span>;
}
