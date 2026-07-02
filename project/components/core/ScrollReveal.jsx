import React from "react";

/**
 * Generic scroll-reveal wrapper: fades + slides its children up into place
 * the first time they cross into the viewport (IntersectionObserver, fires
 * once). Use `delay` (ms) to stagger siblings — e.g. cards in a grid.
 * Respects prefers-reduced-motion (shows content immediately, no transform).
 */
export function ScrollReveal({ children, delay = 0, y = 24, className = "", as = "div", style = {} }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    // Safety net: if the element is already in view the instant we mount
    // (e.g. always-above-the-fold content, or an observer callback that's
    // delayed/suspended — Chromium pauses IntersectionObserver entirely
    // while a document is hidden, as during prerender/back-forward-cache),
    // reveal immediately via a synchronous rect check rather than waiting
    // on the observer. A short timeout below is a second fallback in case
    // neither the observer nor the sync check ever resolves.
    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight * 0.9 && rect.bottom > 0 && rect.width > 0 && rect.height > 0;
    if (alreadyVisible) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    const fallback = setTimeout(() => setVisible(true), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={["tp-reveal", visible ? "tp-reveal--visible" : "", className].filter(Boolean).join(" ")}
      style={{
        "--reveal-y": `${y}px`,
        "--reveal-delay": `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
