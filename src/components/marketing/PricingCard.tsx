import React from "react";

export interface PricingCardProps {
  name: React.ReactNode;
  description?: React.ReactNode;
  featured?: boolean;
  badge?: React.ReactNode;
  features?: string[];
  cta?: string;
  onSelect?: React.MouseEventHandler;
  className?: string;
}

/** Pricing tier card — Full / MTPE / Express plan grid. */
export function PricingCard({
  name,
  description,
  featured = false,
  badge,
  features = [],
  cta = "Загрузить документ",
  onSelect,
  className = "",
}: PricingCardProps) {
  return (
    <div
      className={["tp-pricing-card", featured ? "tp-pricing-card--featured" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {badge ? <span className="tp-pricing-card__badge">{badge}</span> : null}
      <div className="tp-pricing-card__name">{name}</div>
      <p className="tp-pricing-card__desc">{description}</p>
      {features.length ? (
        <ul className="tp-pricing-card__features">
          {features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ) : null}
      <button type="button" className="tp-pricing-card__cta" onClick={onSelect}>
        {cta}
      </button>
    </div>
  );
}
