import React from "react";

/**
 * Grayscale "among our clients" logo wall — real social proof instead of
 * an abstract stat row. No real client logos were supplied yet, so this
 * renders wordmark-style text chips rather than inventing real company
 * marks; pass a visible `caption` disclosing that until real logos land
 * (see readme.md § caveats — same convention as StatMetric's placeholder note).
 */
export function LogoStrip({ logos = [], caption, className = "" }) {
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
