import React from "react";

/** Multi-column marketing footer. */
export function Footer({ logo, columns = [], bottom, className = "" }) {
  return (
    <footer className={["tp-footer", className].filter(Boolean).join(" ")}>
      <div className="tp-footer__inner">
        <div className="tp-footer__brand">{logo}</div>
        <div className="tp-footer__columns">
          {columns.map((col) => (
            <div className="tp-footer__col" key={col.title}>
              <div className="tp-footer__col-title">{col.title}</div>
              {col.links.map((l) => (
                <a key={l.label} href={l.href || "#"} className="tp-footer__link">
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      {bottom ? <div className="tp-footer__bottom">{bottom}</div> : null}
    </footer>
  );
}
