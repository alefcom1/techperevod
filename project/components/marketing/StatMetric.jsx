import React from "react";

/** Big number + label — social-proof metrics row. */
export function StatMetric({ value, label, className = "" }) {
  return (
    <div className={["tp-stat", className].filter(Boolean).join(" ")}>
      <div className="tp-stat__value">{value}</div>
      <div className="tp-stat__label">{label}</div>
    </div>
  );
}
