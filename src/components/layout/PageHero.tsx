import React from "react";
import { Button } from "@/components/core/Button";

export interface PageHeroProps {
  breadcrumb?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
}

/** Compact interior-page hero: breadcrumb, H1, subtitle, CTA. */
export function PageHero({
  breadcrumb,
  title,
  subtitle,
  icon,
  ctaHref = "/#hero",
  ctaLabel = "Загрузить документ",
}: PageHeroProps) {
  return (
    <section className="tp-pagehero">
      <div className="tp-pagehero__inner">
        {breadcrumb ? <div className="tp-pagehero__breadcrumb">{breadcrumb}</div> : null}
        <div className="tp-pagehero__title-row">
          {icon ? <div className="tp-pagehero__icon">{icon}</div> : null}
          <h1 className="tp-pagehero__title">{title}</h1>
        </div>
        {subtitle ? <p className="tp-pagehero__subtitle">{subtitle}</p> : null}
        <div className="tp-pagehero__cta">
          <Button size="lg" variant="primary" as="a" href={ctaHref}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
