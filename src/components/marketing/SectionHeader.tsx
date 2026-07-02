import React from "react";

export interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

/** Section intro: H2 + supporting paragraph. */
export function SectionHeader({ title, subtitle, align = "center", className = "" }: SectionHeaderProps) {
  return (
    <div className={["tp-section-header", `tp-section-header--${align}`, className].filter(Boolean).join(" ")}>
      <h2 className="tp-section-header__title">{title}</h2>
      {subtitle ? <p className="tp-section-header__subtitle">{subtitle}</p> : null}
    </div>
  );
}
