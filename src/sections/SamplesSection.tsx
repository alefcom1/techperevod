import React from "react";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Icon } from "@/components/core/Icon";
import { pickSamples } from "@/data/sampleDocs";

/**
 * Блок «Примеры перевода» на отраслевых и языковых страницах: 4 PDF-образца
 * (детерминированный выбор по slug страницы — наборы различаются между
 * страницами, но стабильны между рендерами). Каждый PDF: стр. 1 — перевод с
 * водяным знаком «ПРИМЕР», стр. 2 — сертификат точности на языке перевода.
 */
export function SamplesSection({ slug }: { slug: string }) {
  const samples = pickSamples(slug);
  return (
    <section className="tp-section">
      <div className="tp-section__inner">
        <ScrollReveal>
          <SectionHeader
            title="Примеры перевода"
            subtitle="Реальное оформление наших работ: перевод + сертификат точности на языке перевода. Данные в образцах вымышленные."
          />
        </ScrollReveal>
        <div className="tp-doctype-grid">
          {samples.map((s, i) => (
            <ScrollReveal key={s.file} delay={i * 70} as="div">
              <a
                href={s.file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block", height: "100%" }}
                aria-label={`Открыть PDF-пример: ${s.docLabel}, перевод на ${s.targetLangName}`}
              >
                <Card padding="lg" className="tp-doctype-card" style={{ height: "100%" }}>
                  <div className="tp-doctype-card__icon">
                    <Icon name="file-text" size={20} />
                  </div>
                  <div className="tp-doctype-card__title">{s.docLabel}</div>
                  <p className="tp-doctype-card__desc">
                    {s.pairLabel} · перевод на {s.targetLangName}, PDF с сертификатом точности
                  </p>
                </Card>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
