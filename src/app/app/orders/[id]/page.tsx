"use client";

import React from "react";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { StatMetric } from "@/components/marketing/StatMetric";

interface Segment {
  id: string;
  index: number;
  sourceText: string;
  aiDraft: string | null;
  qaFlags: string | null;
  glossaryHits: string | null;
  confidence: number | null;
  concerns: string | null;
  needsReview: boolean;
}

// Та же ставка, что и в src/lib/quote.ts (WORD_RATE_RUB) — не импортируем
// оттуда напрямую, чтобы не тянуть на клиент серверные зависимости парсинга
// документов (mammoth/pdf-parse), которые лежат в том же модуле.
const WORD_RATE_RUB = 1.5;

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

interface OrderDetail {
  id: string;
  fileName: string;
  fileKind: string;
  sourceLang: string;
  targetLang: string;
  words: number;
  segmentsCount: number;
  repeatPct: number;
  priceRub: number;
  etaDays: number;
  status: string;
  note: string | null;
  segments: Segment[];
}

const FLAG_LABELS: Record<string, string> = {
  numbersMismatch: "числа не совпадают",
  hasNegation: "есть отрицание",
  shortSegment: "короткий фрагмент",
  safetyCritical: "техника безопасности",
};

function parseFlags(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const flags = JSON.parse(raw) as Record<string, boolean>;
    return Object.entries(flags)
      .filter(([, v]) => v)
      .map(([k]) => FLAG_LABELS[k] ?? k);
  } catch {
    return [];
  }
}

function parseHits(raw: string | null): { ru: string; en: string }[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as { ru: string; en: string }[];
  } catch {
    return [];
  }
}

function parseConcerns(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((c): c is string => typeof c === "string") : [];
  } catch {
    return [];
  }
}

export default function OrderReportPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = React.useState<OrderDetail | null>(null);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setOrder(data.order))
      .catch(() => setNotFound(true));
  }, [params.id]);

  return (
    <AppShell title="Заказ">
      {() => {
        if (notFound) return <Card padding="lg">Заказ не найден.</Card>;
        if (!order) return null;

        const flaggedCount = order.segments.filter((s) => s.needsReview).length;
        const hasDraft = order.segments.some((s) => s.aiDraft);
        const reviewWords = order.segments.filter((s) => s.needsReview).reduce((sum, s) => sum + wordCount(s.sourceText), 0);
        const autoWords = order.segments.filter((s) => !s.needsReview).reduce((sum, s) => sum + wordCount(s.sourceText), 0);
        const fullReviewCost = Math.round((autoWords + reviewWords) * WORD_RATE_RUB);
        const routedReviewCost = Math.round(reviewWords * WORD_RATE_RUB);
        const savings = fullReviewCost - routedReviewCost;

        return (
          <>
            <Card padding="lg">
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--tp-space-4)" }}>
                <div>
                  <div className="tp-value-card__title" style={{ fontSize: 20 }}>
                    {order.fileName}
                  </div>
                  <p className="tp-value-card__desc" style={{ marginTop: 4 }}>
                    {order.sourceLang.toUpperCase()} → {order.targetLang.toUpperCase()} · {order.fileKind}
                  </p>
                </div>
                <Badge tone={hasDraft ? "primary" : "neutral"}>
                  {hasDraft ? "AI-черновик готов" : "Оценка"}
                </Badge>
              </div>
              {order.note ? (
                <p className="tp-translator__note" style={{ marginTop: "var(--tp-space-4)" }}>
                  {order.note}
                </p>
              ) : null}
            </Card>

            <div className="tp-app__grid">
              <Card padding="lg">
                <StatMetric value={order.words.toLocaleString("ru-RU")} label="слов" />
              </Card>
              <Card padding="lg">
                <StatMetric value={`${order.priceRub.toLocaleString("ru-RU")} ₽`} label="оценка стоимости" />
              </Card>
              <Card padding="lg">
                <StatMetric value={`${order.repeatPct}%`} label="внутренних повторов" />
              </Card>
              <Card padding="lg">
                <StatMetric value={String(order.etaDays)} label="дней срок" />
              </Card>
            </div>

            {hasDraft ? (
              <Card padding="lg">
                <div className="tp-value-card__title" style={{ fontSize: 18, marginBottom: 8 }}>
                  Маршрутизация на человека
                </div>
                <p className="tp-value-card__desc" style={{ marginBottom: "var(--tp-space-4)" }}>
                  Каждый сегмент помечается для проверки, если сработала эвристика (числа, отрицания, техника
                  безопасности) ИЛИ сама модель оценила уверенность ниже 4 из 5 — низкая самооценка не наказывается,
                  она и есть сигнал для маршрутизации.
                </p>
                <div className="tp-app__grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                  <div>
                    <div className="tp-value-card__title" style={{ fontSize: 22 }}>
                      {order.segments.length - flaggedCount} / {order.segments.length}
                    </div>
                    <div className="tp-value-card__desc">сегментов — автосдача ({autoWords.toLocaleString("ru-RU")} слов)</div>
                  </div>
                  <div>
                    <div className="tp-value-card__title" style={{ fontSize: 22, color: flaggedCount > 0 ? "#E5484D" : undefined }}>
                      {flaggedCount} / {order.segments.length}
                    </div>
                    <div className="tp-value-card__desc">на проверку человеку ({reviewWords.toLocaleString("ru-RU")} слов)</div>
                  </div>
                  <div>
                    <div className="tp-value-card__title" style={{ fontSize: 22 }}>
                      {savings.toLocaleString("ru-RU")} ₽
                    </div>
                    <div className="tp-value-card__desc">
                      экономия на редактуре против сплошной вычитки всего документа инженером
                    </div>
                  </div>
                </div>
              </Card>
            ) : null}

            {hasDraft ? (
              <Card padding="lg">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--tp-space-4)", flexWrap: "wrap", gap: "var(--tp-space-3)" }}>
                  <div className="tp-value-card__title" style={{ fontSize: 18 }}>
                    Отчёт о качестве · {order.segments.length} сегментов
                  </div>
                  {flaggedCount > 0 ? (
                    <span style={{ color: "#E5484D", fontSize: 13 }}>
                      {flaggedCount} {flaggedCount === 1 ? "сегмент помечен" : "сегментов помечено"} для проверки
                    </span>
                  ) : (
                    <span style={{ color: "var(--tp-text-muted)", fontSize: 13 }}>Автопроверки не нашли рискованных мест</span>
                  )}
                </div>
                <p className="tp-value-card__desc" style={{ marginBottom: "var(--tp-space-4)" }}>
                  Черновик сгенерирован AI-переводчиком. Правка живым инженером по этим сегментам появится, когда на
                  платформе будет готов инструмент для редактора — сейчас это только автоматические проверки,
                  самооценка модели и сверка с вашей термбазой.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--tp-space-4)" }}>
                  {order.segments.map((s) => {
                    const flags = parseFlags(s.qaFlags);
                    const hits = parseHits(s.glossaryHits);
                    const concerns = parseConcerns(s.concerns);
                    return (
                      <div
                        key={s.id}
                        style={{
                          border: `1px solid ${s.needsReview ? "#E5484D" : "var(--tp-border)"}`,
                          borderRadius: "var(--tp-radius-md)",
                          padding: "var(--tp-space-4)",
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "var(--tp-space-4)",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 11, color: "var(--tp-text-muted)", marginBottom: 4 }}>ОРИГИНАЛ</div>
                          <div className="tp-mono" style={{ fontSize: 14 }}>{s.sourceText}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: "var(--tp-text-muted)", marginBottom: 4 }}>AI-ЧЕРНОВИК</div>
                          <div className="tp-mono" style={{ fontSize: 14 }}>{s.aiDraft}</div>
                        </div>
                        <div style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                          {s.confidence != null ? (
                            <Badge tone={s.confidence >= 4 ? "accent" : "neutral"} size="sm">
                              AI-уверенность: {s.confidence}/5
                            </Badge>
                          ) : null}
                          {s.needsReview ? (
                            <span style={{ color: "#E5484D", fontSize: 13 }}>→ на проверку человеку</span>
                          ) : (
                            <span style={{ color: "var(--tp-text-muted)", fontSize: 13 }}>→ автосдача</span>
                          )}
                          {flags.map((f) => (
                            <Badge key={f} tone="neutral" size="sm">
                              ⚠ {f}
                            </Badge>
                          ))}
                          {hits.map((h) => (
                            <Badge key={h.ru} tone="accent" size="sm">
                              термбаза: {h.ru} → {h.en}
                            </Badge>
                          ))}
                        </div>
                        {concerns.length > 0 ? (
                          <div style={{ gridColumn: "1 / -1", fontSize: 13, color: "var(--tp-text-muted)" }}>
                            Сомнения модели: {concerns.join("; ")}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </Card>
            ) : (
              <Card padding="lg">
                <span className="tp-translator__note">
                  Черновик ещё не сгенерирован — вернитесь в <a href="/app/editor">редактор</a> и нажмите «Сгенерировать
                  черновик и отчёт».
                </span>
              </Card>
            )}
          </>
        );
      }}
    </AppShell>
  );
}
