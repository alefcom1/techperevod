import React from "react";

export interface IndustryCardProps {
  icon?: React.ReactNode;
  name: React.ReactNode;
  className?: string;
}

/** Icon-card for an industry vertical (IT/SaaS, нефтегаз, машиностроение, медтех). */
export function IndustryCard({ icon, name, className = "" }: IndustryCardProps) {
  return (
    <div className={["tp-industry-card", className].filter(Boolean).join(" ")}>
      <div className="tp-industry-card__icon">{icon}</div>
      <div className="tp-industry-card__name">{name}</div>
    </div>
  );
}
