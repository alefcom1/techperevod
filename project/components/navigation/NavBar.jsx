import React from "react";

/**
 * Sticky top navigation for the marketing site. Logo/name slot on the left,
 * link list centered/right, CTA + theme toggle on the far right.
 */
export function NavBar({ logo, links = [], cta, right, className = "" }) {
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
            <a key={l.label} href={l.href || "#"} className="tp-nav__link">
              {l.label}
            </a>
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
