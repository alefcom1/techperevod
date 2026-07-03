"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { StatMetric } from "@/components/marketing/StatMetric";
import { Button } from "@/components/core/Button";

const PLAN_QUOTAS: Record<string, number> = { free: 10_000, start: 100_000, pro: 500_000 };
const PLAN_NAMES: Record<string, string> = { free: "Free", start: "Start", pro: "Pro" };

const STATUS_LABELS: Record<string, { label: string; tone: "accent" | "primary" | "neutral" }> = {
  quote: { label: "Оценка", tone: "neutral" },
  ai_draft: { label: "AI-черновик готов", tone: "primary" },
  in_review: { label: "На редактуре", tone: "primary" },
  done: { label: "Готово", tone: "accent" },
};

interface OrderRow {
  id: string;
  fileName: string;
  sourceLang: string;
  targetLang: string;
  words: number;
  status: string;
  priceRub: number;
  createdAt: string;
}

export default function DashboardPage() {
  const [orders, setOrders] = React.useState<OrderRow[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders ?? []))
      .finally(() => setLoading(false));
  }, []);

  const monthPrefix = new Date().toISOString().slice(0, 7);
  const usage = orders
    .filter((o) => o.createdAt.slice(0, 7) === monthPrefix)
    .reduce((sum, o) => sum + o.words, 0);

  return (
    <AppShell title="Обзор">
      {(user) => {
        const quota = PLAN_QUOTAS[user.plan] ?? PLAN_QUOTAS.free;
        const pct = Math.min(100, Math.round((usage / quota) * 100));
        return (
          <>
            <div className="tp-app__grid">
              <Card padding="lg" className="tp-quota">
                <div className="tp-value-card__title" style={{ fontSize: 16 }}>
                  Слов за месяц · тариф {PLAN_NAMES[user.plan] ?? user.plan}
                </div>
                <div className="tp-quota__bar">
                  <span className="tp-quota__fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="tp-quota__meta">
                  <span>{usage.toLocaleString("ru-RU")} обработано</span>
                  <span>{quota.toLocaleString("ru-RU")} / мес</span>
                </div>
              </Card>
              <Card padding="lg">
                <StatMetric value={String(orders.length)} label="заказов всего" />
              </Card>
              <Card padding="lg">
                <StatMetric
                  value={orders.reduce((s, o) => s + o.words, 0).toLocaleString("ru-RU")}
                  label="слов обработано всего"
                />
              </Card>
            </div>

            <Card padding="lg">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "var(--tp-space-4)",
                  gap: "var(--tp-space-4)",
                  flexWrap: "wrap",
                }}
              >
                <div className="tp-value-card__title" style={{ fontSize: 18 }}>
                  Заказы
                </div>
                <Button size="sm" variant="primary" as="a" href="/app/editor">
                  Новый перевод
                </Button>
              </div>
              <table className="tp-app-table">
                <thead>
                  <tr>
                    <th>Документ</th>
                    <th>Пара</th>
                    <th>Слов</th>
                    <th>Статус</th>
                    <th>Создан</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => {
                    const status = STATUS_LABELS[o.status] ?? STATUS_LABELS.quote;
                    return (
                      <tr key={o.id}>
                        <td className="tp-mono">
                          <Link href={`/app/orders/${o.id}`}>{o.fileName}</Link>
                        </td>
                        <td className="tp-mono">
                          {o.sourceLang.toUpperCase()}→{o.targetLang.toUpperCase()}
                        </td>
                        <td>{o.words.toLocaleString("ru-RU")}</td>
                        <td>
                          <Badge tone={status.tone} size="sm">
                            {status.label}
                          </Badge>
                        </td>
                        <td className="tp-mono">{new Date(o.createdAt).toLocaleDateString("ru-RU")}</td>
                      </tr>
                    );
                  })}
                  {!loading && orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ color: "var(--tp-text-muted)" }}>
                        Пока нет заказов — <Link href="/app/editor">создайте первый перевод</Link>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </Card>
          </>
        );
      }}
    </AppShell>
  );
}
