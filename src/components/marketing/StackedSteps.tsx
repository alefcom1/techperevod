"use client";

import React from "react";

export interface StackedStepRow {
  icon: React.ReactNode;
  text: string;
}

export interface StackedStep {
  title: string;
  description: string;
  rows: StackedStepRow[];
}

export interface StackedStepsProps {
  /** Левая статичная колонка (sticky на всю высоту экрана). */
  aside: React.ReactNode;
  steps: StackedStep[];
  className?: string;
}

/**
 * Блок в духе Crowdin «fits seamlessly into your development workflow»
 * (компонент CardsParallax): слева sticky-текст, справа карточки-шаги, каждая
 * занимает экран; при скролле уходящая карточка уменьшается, поднимается и
 * растворяется, следующая появляется снизу в полный размер. Скролл-драйв на
 * requestAnimationFrame, без библиотек; уважает prefers-reduced-motion.
 */
export function StackedSteps({ aside, steps, className = "" }: StackedStepsProps) {
  const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);
  const ticking = React.useRef(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function update() {
      ticking.current = false;
      const vh = window.innerHeight;
      // На мобильной раскладке (одна колонка) анимация выключена
      if (window.innerWidth < 900) {
        cardsRef.current.forEach((el) => {
          if (el) {
            el.style.opacity = "";
            el.style.transform = "";
          }
        });
        return;
      }
      cardsRef.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        // d: смещение центра карточки от центра экрана в долях высоты экрана
        const d = (center - vh / 2) / vh;
        let opacity = 1;
        let scale = 1;
        let ty = 0;
        if (d > 0) {
          // карточка входит снизу: слегка уменьшена и приглушена
          const p = Math.min(d, 1);
          opacity = 1 - p * 0.45;
          scale = 1 - p * 0.06;
        } else {
          // карточка уходит вверх: уменьшается и растворяется
          const p = Math.min(-d * 1.7, 1);
          opacity = 1 - p;
          scale = 1 - p * 0.16;
          ty = -p * 48;
        }
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${ty}px) scale(${scale})`;
      });
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  return (
    <div className={["tp-stacked", className].filter(Boolean).join(" ")}>
      <div className="tp-stacked__aside">
        <div className="tp-stacked__aside-inner">{aside}</div>
      </div>
      <div className="tp-stacked__cards">
        {steps.map((s, i) => (
          <div className="tp-stacked__slot" key={s.title}>
            <div
              className="tp-stacked__card"
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
            >
              <div className="tp-stacked__num">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="tp-stacked__title">{s.title}</h3>
              <p className="tp-stacked__desc">{s.description}</p>
              <div className="tp-stacked__rows">
                {s.rows.map((r) => (
                  <div className="tp-stacked__row" key={r.text}>
                    {r.icon}
                    <span>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
