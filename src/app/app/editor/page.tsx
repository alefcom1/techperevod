"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/core/Card";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { Translator } from "@/components/translator/Translator";

/**
 * Редактор перевода: тот же Translator (вкладка «Документ» уже сохраняет
 * реальный заказ через /api/quote, т.к. пользователь авторизован) + кнопка,
 * которая превращает сохранённую оценку в AI-черновик с отчётом о качестве
 * (/api/orders/[id]/translate) и ведёт на страницу заказа.
 */
export default function EditorPage() {
  const router = useRouter();
  const [orderId, setOrderId] = React.useState<string | null>(null);
  const [generating, setGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function generateDraft() {
    if (!orderId) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch(`/api/orders/${orderId}/translate`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Не удалось сгенерировать черновик");
        return;
      }
      router.push(`/app/orders/${orderId}`);
    } catch {
      setError("Нет соединения с сервером. Попробуйте ещё раз.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <AppShell title="Перевод">
      {() => (
        <>
          <Card padding="lg">
            <Translator onQuoteCreated={setOrderId} />
          </Card>

          <Card padding="lg">
            <div className="tp-value-card__title" style={{ fontSize: 18, marginBottom: 8 }}>
              AI-черновик и отчёт о качестве
            </div>
            <p className="tp-value-card__desc" style={{ marginBottom: "var(--tp-space-5)" }}>
              Загрузите документ на вкладке «Документ» выше — после мгновенной оценки здесь можно сразу получить
              AI-черновик перевода по сегментам, автоматические QA-проверки и сверку с вашей термбазой.
            </p>
            {orderId ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--tp-space-4)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--tp-space-3)", color: "var(--tp-text)" }}>
                  <Icon name="shield-check" color="var(--tp-accent)" size={22} />
                  Документ оценён — можно сгенерировать черновик.
                </div>
                {error ? <div className="tp-translator__error">{error}</div> : null}
                <Button variant="primary" onClick={generateDraft} disabled={generating}>
                  {generating ? "Генерируем…" : "Сгенерировать черновик и отчёт"}
                </Button>
              </div>
            ) : (
              <span className="tp-translator__note">Сначала загрузите документ на вкладке «Документ» выше.</span>
            )}
          </Card>
        </>
      )}
    </AppShell>
  );
}
