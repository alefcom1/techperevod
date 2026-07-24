"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/core/Icon";

export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavMegaItem {
  label: string;
  href: string;
  iconName?: string;
  flag?: string;
}

export interface NavMegaSection {
  key: string;
  railLabel: string;
  panelTitle: string;
  seeAllHref: string;
  seeAllLabel: string;
  items: NavMegaItem[];
}

export interface NavLink {
  label: string;
  href?: string;
  dropdown?: NavDropdownItem[];
  mega?: NavMegaSection[];
}

/** Ячейка мегаменю: флаг-эмодзи для языков, иконка из реестра — для остального. */
function MegaGlyph({ item }: { item: NavMegaItem }) {
  if (item.flag) {
    return (
      <span className="tp-mega__flag" aria-hidden="true">
        {item.flag}
      </span>
    );
  }
  return (
    <span className="tp-mega__ico" aria-hidden="true">
      <Icon name={item.iconName || "file-text"} size={18} />
    </span>
  );
}

export interface NavBarProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  cta?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

function SmartLink({ href, className, onClick, children }: { href: string; className?: string; onClick?: () => void; children: React.ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

/**
 * Sticky top navigation for the marketing site. Logo on the left, 5-item
 * link list in the middle (some plain links, some click-to-open dropdowns)
 * in the middle, CTA + theme toggle on the far right. Shrinks + gains a
 * shadow after the page scrolls past the fold. Below ~900px the link row
 * collapses behind a hamburger that opens a full-width drawer with the
 * dropdown groups rendered as accordions.
 */
export function NavBar({ logo, links = [], cta, right, className = "" }: NavBarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [megaSection, setMegaSection] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);
  const navRef = React.useRef<HTMLElement>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Закрыть всё при переходе на другую страницу.
  React.useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
    setOpenAccordion(null);
  }, [pathname]);

  // Клик вне навигации / Escape — закрыть открытый десктопный дропдаун.
  React.useEffect(() => {
    if (!openDropdown) return;
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenDropdown(null);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openDropdown]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Открытая мегапанель (пункт «Решения») и её активное измерение.
  const openMega = links.find((l) => l.label === openDropdown && l.mega)?.mega;
  const activeSection = openMega ? openMega.find((s) => s.key === megaSection) ?? openMega[0] : null;

  return (
    <header ref={navRef} className={["tp-nav", scrolled ? "tp-nav--scrolled" : "", className].filter(Boolean).join(" ")}>
      <div className="tp-nav__inner">
        <div className="tp-nav__logo">{logo}</div>

        <nav className="tp-nav__links">
          {links.map((l) =>
            l.dropdown || l.mega ? (
              <div className="tp-nav__item" key={l.label}>
                <button
                  type="button"
                  className={["tp-nav__link", "tp-nav__trigger", openDropdown === l.label ? "tp-nav__trigger--open" : ""].filter(Boolean).join(" ")}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === l.label}
                  onClick={() => {
                    const willOpen = openDropdown !== l.label;
                    setOpenDropdown(willOpen ? l.label : null);
                    if (willOpen && l.mega) setMegaSection(l.mega[0].key);
                  }}
                >
                  {l.label}
                  <Icon name="chevron-down" size={15} />
                </button>
                {openDropdown === l.label && l.dropdown ? (
                  <div className="tp-nav__dropdown">
                    {l.dropdown.map((d) => (
                      <SmartLink key={d.label} href={d.href} className="tp-nav__dropdown-link" onClick={() => setOpenDropdown(null)}>
                        {d.label}
                      </SmartLink>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <SmartLink key={l.label} href={l.href || "#"} className="tp-nav__link">
                {l.label}
              </SmartLink>
            )
          )}
        </nav>

        <div className="tp-nav__right">
          <div className="tp-nav__right-actions">
            {right}
            {cta}
          </div>
          <button
            type="button"
            className="tp-nav__burger"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {openMega && activeSection ? (
        <div className="tp-nav__mega-wrap">
          <div className="tp-mega" role="region" aria-label="Решения">
            <div className="tp-mega__rail">
              {openMega.map((s) => (
                <button
                  type="button"
                  key={s.key}
                  className={["tp-mega__rail-item", activeSection.key === s.key ? "tp-mega__rail-item--active" : ""].filter(Boolean).join(" ")}
                  onMouseEnter={() => setMegaSection(s.key)}
                  onFocus={() => setMegaSection(s.key)}
                  onClick={() => setMegaSection(s.key)}
                >
                  <span>{s.railLabel}</span>
                  <Icon name="arrow-right" size={15} />
                </button>
              ))}
            </div>
            <div className="tp-mega__panel">
              <div className="tp-mega__panel-title">{activeSection.panelTitle}</div>
              <div className="tp-mega__grid">
                {activeSection.items.map((it) => (
                  <SmartLink key={it.href} href={it.href} className="tp-mega__link" onClick={() => setOpenDropdown(null)}>
                    <MegaGlyph item={it} />
                    <span className="tp-mega__link-label">{it.label}</span>
                  </SmartLink>
                ))}
              </div>
              <div className="tp-mega__foot">
                <SmartLink href={activeSection.seeAllHref} className="tp-mega__seeall" onClick={() => setOpenDropdown(null)}>
                  {activeSection.seeAllLabel}
                </SmartLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="tp-nav__drawer">
          {links.map((l) => {
            if (l.mega) {
              return (
                <div className="tp-nav__accordion" key={l.label}>
                  <button
                    type="button"
                    className="tp-nav__accordion-trigger"
                    aria-expanded={openAccordion === l.label}
                    onClick={() => setOpenAccordion(openAccordion === l.label ? null : l.label)}
                  >
                    {l.label}
                    <Icon name="chevron-down" size={16} className={openAccordion === l.label ? "tp-nav__accordion-chevron--open" : ""} />
                  </button>
                  {openAccordion === l.label ? (
                    <div className="tp-nav__accordion-panel">
                      {l.mega.map((s) => (
                        <div className="tp-nav__mega-m-group" key={s.key}>
                          <div className="tp-nav__mega-m-title">{s.railLabel}</div>
                          {s.items.map((it) => (
                            <SmartLink key={it.href} href={it.href} className="tp-nav__drawer-link tp-nav__drawer-link--sub" onClick={() => setMobileOpen(false)}>
                              {it.flag ? (
                                <span className="tp-mega__flag" aria-hidden="true">
                                  {it.flag}
                                </span>
                              ) : null}
                              {it.label}
                            </SmartLink>
                          ))}
                          <SmartLink href={s.seeAllHref} className="tp-nav__drawer-link tp-nav__mega-m-seeall" onClick={() => setMobileOpen(false)}>
                            {s.seeAllLabel}
                          </SmartLink>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }
            if (l.dropdown) {
              return (
                <div className="tp-nav__accordion" key={l.label}>
                  <button
                    type="button"
                    className="tp-nav__accordion-trigger"
                    aria-expanded={openAccordion === l.label}
                    onClick={() => setOpenAccordion(openAccordion === l.label ? null : l.label)}
                  >
                    {l.label}
                    <Icon name="chevron-down" size={16} className={openAccordion === l.label ? "tp-nav__accordion-chevron--open" : ""} />
                  </button>
                  {openAccordion === l.label ? (
                    <div className="tp-nav__accordion-panel">
                      {l.dropdown.map((d) => (
                        <SmartLink key={d.label} href={d.href} className="tp-nav__drawer-link" onClick={() => setMobileOpen(false)}>
                          {d.label}
                        </SmartLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }
            return (
              <SmartLink key={l.label} href={l.href || "#"} className="tp-nav__drawer-link tp-nav__drawer-link--top" onClick={() => setMobileOpen(false)}>
                {l.label}
              </SmartLink>
            );
          })}
          <div className="tp-nav__drawer-actions">
            {right}
            {cta}
          </div>
        </div>
      ) : null}
    </header>
  );
}
