"use client";

import React from "react";
import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/core/Card";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { Translator } from "@/components/translator/Translator";
import { addUsage, addProject } from "@/lib/demo-account";

/**
 * Редактор перевода: тот же Translator + учёт квоты и заказ редактуры
 * (уровень 3 концепции) — расчёт стоимости по словам, заявка в один клик.
 */
export default function EditorPage() {
  const [reviewWords, setReviewWords] = React.useState(1000);
  const [reviewKind, setReviewKind] = React.useState<"engineer" | "native">("engineer");
  const [requested, setRequested] = React.useState(false);

  const rate = reviewKind === "engineer" ? 1.5 : 3;
  const price = Math.round(reviewWords * rate).toLocaleString("ru-RU");

  function requestReview() {
    addUsage(0);
    addProject({
      name: `review-${reviewWords}w.docx`,
      source: "ru",
      target: "en",
      words: reviewWords,
      status: "review",
    });
    setRequested(true);
  }

  return (
    <AppShell title="Перевод">
      {() => (
        <>
          <Card padding="lg">
            <Translator compact />
          </Card>

          <Card padding="lg">
            <div className="tp-value-card__title" style={{ fontSize: 18, marginBottom: 8 }}>
              Заказать редактуру человеком
            </div>
            <p className="tp-value-card__desc" style={{ marginBottom: "var(--tp-space-5)" }}>
              Уровень 3: специалист проверит перевод по вашей термбазе. Цена считается по словам, срок — от 24 часов.
            </p>
            {requested ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--tp-space-3)",
                  color: "var(--tp-text)",
                }}
              >
                <Icon name="shield-check" color="var(--tp-accent)" size={24} />
                Заявка создана и появилась в проектах. Менеджер свяжется с вами (в демо — имитация).
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--tp-space-5)" }}>
                <div className="tp-translator__tabs" role="radiogroup" aria-label="Тип редактуры">
                  <button
                    type="button"
                    className={`tp-translator__tab ${reviewKind === "engineer" ? "tp-translator__tab--active" : ""}`}
                    onClick={() => setReviewKind("engineer")}
                  >
                    Редактор-инженер · 1,5 ₽/слово
                  </button>
                  <button
                    type="button"
                    className={`tp-translator__tab ${reviewKind === "native" ? "tp-translator__tab--active" : ""}`}
                    onClick={() => setReviewKind("native")}
                  >
                    Носитель языка · 3 ₽/слово
                  </button>
                </div>
                <div className="tp-calc" style={{ padding: "var(--tp-space-5)" }}>
                  <div className="tp-calc__row">
                    <span className="tp-calc__label">Объём: {reviewWords.toLocaleString("ru-RU")} слов</span>
                    <span className="tp-calc__value" style={{ fontSize: 24 }}>
                      {price} ₽
                    </span>
                  </div>
                  <input
                    type="range"
                    className="tp-calc__slider"
                    min={200}
                    max={50000}
                    step={200}
                    value={reviewWords}
                    onChange={(e) => setReviewWords(Number(e.target.value))}
                    aria-label="Объём слов для редактуры"
                  />
                </div>
                <Button variant="primary" onClick={requestReview}>
                  Заказать проверку
                </Button>
              </div>
            )}
          </Card>
        </>
      )}
    </AppShell>
  );
}
