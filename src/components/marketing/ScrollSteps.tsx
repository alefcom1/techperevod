"use client";

import React from "react";

export interface ScrollStep {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  bullets?: string[];
}

export interface ScrollStepsProps {
  steps?: ScrollStep[];
  className?: string;
}

/**
 * Crowdin-style scroll-driven steps: a sticky right-hand panel (icon + title +
 * description) paired with a left-hand list of step labels the user scrolls
 * past — the active step is full-size and dark, steps above shrink/fade out,
 * steps below sit dim until active. CSS `position: sticky` +
 * IntersectionObserver driving an `--active` index; no scroll-jacking.
 */
export function ScrollSteps({ steps = [], className = "" }: ScrollStepsProps) {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div className={["tp-scrollsteps", className].filter(Boolean).join(" ")}>
      <div className="tp-scrollsteps__list">
        {steps.map((s, i) => {
          const dist = Math.abs(i - active);
          const state = i === active ? "active" : i < active ? "past" : "future";
          return (
            <div
              key={s.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-idx={i}
              className={`tp-scrollsteps__item tp-scrollsteps__item--${state}`}
              style={{ "--dist": Math.min(dist, 3) } as React.CSSProperties}
            >
              <span className="tp-scrollsteps__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="tp-scrollsteps__label">{s.title}</span>
            </div>
          );
        })}
      </div>

      <div className="tp-scrollsteps__sticky">
        <div className="tp-scrollsteps__panel">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={
                "tp-scrollsteps__panel-content" + (i === active ? " tp-scrollsteps__panel-content--active" : "")
              }
            >
              {s.icon ? <div className="tp-scrollsteps__icon">{s.icon}</div> : null}
              <div className="tp-scrollsteps__panel-title">{s.title}</div>
              <p className="tp-scrollsteps__panel-desc">{s.description}</p>
              {s.bullets ? (
                <ul className="tp-scrollsteps__bullets">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
          <span className="tp-scrollsteps__index">{String(active + 1).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}
