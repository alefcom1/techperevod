import React from "react";

/**
 * Pricing tier card — composes Card + Badge + Button. Use for the
 * Full / MTPE / Express plan grid.
 */
export function PricingCard({
  name,
  description,
  featured = false,
  badge,
  features = [],
  cta = "Загрузить документ",
  onSelect,
  className = "",
}) {
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
