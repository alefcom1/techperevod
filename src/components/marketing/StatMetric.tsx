import React from "react";

export interface StatMetricProps {
  value: React.ReactNode;
  label: React.ReactNode;
  className?: string;
}

/** Big number + label — social-proof metrics row. */
export function StatMetric({ value, label, className = "" }: StatMetricProps) {
  return (
    <div className={["tp-stat", className].filter(Boolean).join(" ")}>
      <div className="tp-stat__value">{value}</div>
      <div className="tp-stat__label">{label}</div>
    </div>
  );
}
