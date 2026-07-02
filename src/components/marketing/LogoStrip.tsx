import React from "react";

export interface LogoStripProps {
  logos?: string[];
  caption?: React.ReactNode;
  className?: string;
}

/**
 * Grayscale "among our clients" logo wall. Renders wordmark-style text chips
 * rather than inventing real company marks; pass a `caption` disclosing that
 * these are illustrative until real logos land.
 */
export function LogoStrip({ logos = [], caption, className = "" }: LogoStripProps) {
  return (
    <div className={["tp-logostrip", className].filter(Boolean).join(" ")}>
      {caption ? <div className="tp-logostrip__caption">{caption}</div> : null}
      <div className="tp-logostrip__row">
        {logos.map((l) => (
          <span key={l} className="tp-logostrip__item">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
