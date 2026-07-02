"use client";

import React from "react";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";
import { Icon } from "@/components/core/Icon";
import { ProductWindow } from "@/components/marketing/ProductWindow";
import { reachGoal } from "@/lib/metrika";

export interface HeroSectionProps {
  subtitle?: string;
}

export function HeroSection({
  subtitle = "Документ переводит связка из нескольких AI-моделей и инженера с профильным образованием — а оценку объёма и срока вы получите уже через 2 минуты после загрузки.",
}: HeroSectionProps) {
  return (
    <section className="tp-hero" id="hero">
      <div className="tp-hero__inner">
        <div className="tp-hero__copy">
          <h1 className="tp-hero__title">
            Технический перевод: <span className="tp-hero__title-accent">скорость AI</span>, точность инженера
          </h1>
          <p className="tp-hero__subtitle">{subtitle}</p>
          <div className="tp-hero__ctas">
            <Button size="lg" variant="primary" as="a" href="/kontakty" onClick={() => reachGoal("doc_cta")}>
              Перевести документ
            </Button>
            <Button size="lg" variant="ghost" as="a" href="#translate">
              Попробовать переводчик
            </Button>
          </div>
        </div>

        <div className="tp-hero__visual">
          <ProductWindow url="app.techperevod.com/orchestrator">
            <div className="tp-queue-row">
              <Icon name="file-text" size={17} color="var(--tp-text-muted)" />
              <span className="tp-queue-row__name">tech-drawing-042.dwg</span>
              <Badge tone="accent" size="sm">
                YandexGPT
              </Badge>
              <span className="tp-queue-row__status tp-queue-row__status--done">
                <Icon name="check" size={13} /> Готово
              </span>
            </div>
            <div className="tp-queue-row">
              <Icon name="file-text" size={17} color="var(--tp-text-muted)" />
              <span className="tp-queue-row__name">service-manual-en.docx</span>
              <Badge tone="primary" size="sm">
                Claude
              </Badge>
              <span className="tp-queue-row__bar">
                <span className="tp-queue-row__bar-fill" style={{ width: "68%" }} />
              </span>
            </div>
            <div className="tp-queue-row">
              <Icon name="file-text" size={17} color="var(--tp-text-muted)" />
              <span className="tp-queue-row__name">patent-claims.pdf</span>
              <Badge tone="primary" size="sm">
                GPT
              </Badge>
              <span className="tp-queue-row__bar">
                <span className="tp-queue-row__bar-fill" style={{ width: "34%" }} />
              </span>
            </div>
            <div className="tp-queue-row">
              <Icon name="file-text" size={17} color="var(--tp-text-muted)" />
              <span className="tp-queue-row__name">spec-sheet.xlsx</span>
              <Badge tone="accent" size="sm">
                DeepSeek
              </Badge>
              <span className="tp-queue-row__status">
                <Icon name="clock" size={13} /> В очереди
              </span>
            </div>
          </ProductWindow>
        </div>
      </div>
    </section>
  );
}
