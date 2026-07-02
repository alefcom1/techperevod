"use client";

import React from "react";
import Link from "next/link";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavBarProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  cta?: React.ReactNode;
  right?: React.ReactNode;
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

/**
 * Sticky top navigation for the marketing site. Logo on the left, link list in
 * the middle, CTA + theme toggle on the far right. Shrinks + gains a shadow
 * after the page scrolls past the fold.
 */
export function NavBar({ logo, links = [], cta, right, className = "" }: NavBarProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={["tp-nav", scrolled ? "tp-nav--scrolled" : "", className].filter(Boolean).join(" ")}>
      <div className="tp-nav__inner">
        <div className="tp-nav__logo">{logo}</div>
        <nav className="tp-nav__links">
          {links.map((l) => (
            <SmartLink key={l.label} href={l.href || "#"} className="tp-nav__link">
              {l.label}
            </SmartLink>
          ))}
        </nav>
        <div className="tp-nav__right">
          {right}
          {cta}
        </div>
      </div>
    </header>
  );
}
