import React from "react";
import Link from "next/link";

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  logo?: React.ReactNode;
  columns?: FooterColumn[];
  bottom?: React.ReactNode;
  className?: string;
}

function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/** Multi-column marketing footer. */
export function Footer({ logo, columns = [], bottom, className = "" }: FooterProps) {
  return (
    <footer className={["tp-footer", className].filter(Boolean).join(" ")}>
      <div className="tp-footer__inner">
        <div className="tp-footer__brand">{logo}</div>
        <div className="tp-footer__columns">
          {columns.map((col) => (
            <div className="tp-footer__col" key={col.title}>
              <div className="tp-footer__col-title">{col.title}</div>
              {col.links.map((l) => (
                <SmartLink key={l.label} href={l.href || "#"} className="tp-footer__link">
                  {l.label}
                </SmartLink>
              ))}
            </div>
          ))}
        </div>
      </div>
      {bottom ? <div className="tp-footer__bottom">{bottom}</div> : null}
    </footer>
  );
}
