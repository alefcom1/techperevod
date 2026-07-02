"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { StatMetric } from "@/components/marketing/StatMetric";
import { getUsage, getProjects, PLAN_QUOTAS, PLAN_NAMES, type DemoProject } from "@/lib/demo-account";

const STATUS_LABELS: Record<DemoProject["status"], { label: string; tone: "accent" | "primary" | "neutral" }> = {
  done: { label: "Готово", tone: "accent" },
  review: { label: "На редактуре", tone: "primary" },
  draft: { label: "Черновик", tone: "neutral" },
};

export default function DashboardPage() {
  const [usage, setUsage] = React.useState(0);
  const [projects, setProjects] = React.useState<DemoProject[]>([]);

  React.useEffect(() => {
    setUsage(getUsage());
    setProjects(getProjects());
  }, []);

  return (
    <AppShell title="Обзор">
      {(user) => {
        const quota = PLAN_QUOTAS[user.plan];
        const pct = Math.min(100, Math.round((usage / quota) * 100));
        return (
          <>
            <div className="tp-app__grid">
              <Card padding="lg" className="tp-quota">
                <div className="tp-value-card__title" style={{ fontSize: 16 }}>
                  Квота слов · тариф {PLAN_NAMES[user.plan]}
                </div>
                <div className="tp-quota__bar">
                  <span className="tp-quota__fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="tp-quota__meta">
                  <span>{usage.toLocaleString("ru-RU")} использовано</span>
                  <span>{quota.toLocaleString("ru-RU")} / мес</span>
                </div>
                {user.plan === "free" ? (
                  <Button size="sm" variant="ghost" as="a" href="/app/billing">
                    Увеличить квоту
                  </Button>
                ) : null}
              </Card>
              <Card padding="lg">
                <StatMetric value={String(projects.length)} label="проектов в работе" />
              </Card>
              <Card padding="lg">
                <StatMetric
                  value={projects.reduce((s, p) => s + p.words, 0).toLocaleString("ru-RU")}
                  label="слов в проектах"
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
                  Проекты
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
                    <th>Обновлён</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td className="tp-mono">{p.name}</td>
                      <td className="tp-mono">
                        {p.source.toUpperCase()}→{p.target.toUpperCase()}
                      </td>
                      <td>{p.words.toLocaleString("ru-RU")}</td>
                      <td>
                        <Badge tone={STATUS_LABELS[p.status].tone} size="sm">
                          {STATUS_LABELS[p.status].label}
                        </Badge>
                      </td>
                      <td className="tp-mono">{p.updatedAt}</td>
                    </tr>
                  ))}
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ color: "var(--tp-text-muted)" }}>
                        Пока нет проектов — <Link href="/app/editor">создайте первый перевод</Link>
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
