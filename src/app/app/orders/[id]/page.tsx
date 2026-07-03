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
  needsReview: boolean;
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
                  платформе будет готов инструмент для редактора — сейчас это только автоматические проверки и
                  сверка с вашей термбазой.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--tp-space-4)" }}>
                  {order.segments.map((s) => {
                    const flags = parseFlags(s.qaFlags);
                    const hits = parseHits(s.glossaryHits);
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
                        {flags.length > 0 || hits.length > 0 ? (
                          <div style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", gap: 8 }}>
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
