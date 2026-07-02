"use client";

import React from "react";

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

/**
 * Generic scroll-reveal wrapper: fades + slides its children up into place the
 * first time they cross into the viewport (IntersectionObserver, fires once).
 * Use `delay` (ms) to stagger siblings. Respects prefers-reduced-motion, and
 * has two safety nets (sync in-view check on mount + 2s timeout) so content can
 * never get stuck invisible.
 */
export function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
  style = {},
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

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

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={["tp-reveal", visible ? "tp-reveal--visible" : "", className].filter(Boolean).join(" ")}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-delay": `${delay}ms`,
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
