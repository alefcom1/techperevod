"use client";

import React from "react";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { Icon } from "@/components/core/Icon";
import { FileDropzone } from "@/components/forms/FileDropzone";
import { ProductWindow } from "@/components/marketing/ProductWindow";

export function HeroSection() {
  const [quote, setQuote] = React.useState<{ words: string; price: string; eta: string } | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  function handleFiles(files: FileList) {
    const f = files[0];
    setFileName(f.name);
    // Presentational only — fake instant estimate for the click-through demo.
    setQuote({ words: "12 400", price: "34 800 ₽", eta: "2 дня" });
  }

  return (
    <section className="tp-hero" id="hero">
      <div className="tp-hero__inner">
        <div className="tp-hero__copy">
          <h1 className="tp-hero__title">
            Технический перевод: <span className="tp-hero__title-accent">скорость AI</span>, точность инженера
          </h1>
          <p className="tp-hero__subtitle">
            Документ переводит связка из нескольких AI-моделей и инженера с профильным образованием — а оценку
            объёма и срока вы получите уже через 2 минуты после загрузки.
          </p>
          <div className="tp-hero__ctas">
            <Button
              size="lg"
              variant="primary"
              onClick={() => document.getElementById("quote")?.scrollIntoView({ block: "center" })}
            >
              Загрузить документ
            </Button>
            <Button size="lg" variant="ghost" as="a" href="#how">
              Как это работает
            </Button>
          </div>

          <div id="quote" className="tp-hero__quote">
            <FileDropzone
              hint="DOCX, PDF, XLIFF, JSON"
              state={fileName ? "done" : "idle"}
              fileName={fileName ?? undefined}
              onFiles={handleFiles}
            />
            {quote ? (
              <Card variant="glass" padding="sm" className="tp-hero__estimate">
                <div className="tp-hero__estimate-row">
                  <div>
                    <div className="tp-hero__estimate-value">{quote.words}</div>
                    <div className="tp-hero__estimate-label">слов</div>
                  </div>
                  <div>
                    <div className="tp-hero__estimate-value">{quote.price}</div>
                    <div className="tp-hero__estimate-label">оценка стоимости</div>
                  </div>
                  <div>
                    <div className="tp-hero__estimate-value">{quote.eta}</div>
                    <div className="tp-hero__estimate-label">срок</div>
                  </div>
                </div>
              </Card>
            ) : null}
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
