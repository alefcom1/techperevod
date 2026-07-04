"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";

const PLAN_QUOTAS: Record<string, number> = { free: 10_000, start: 100_000, pro: 500_000 };

const PLANS: { id: "free" | "start" | "pro"; name: string; price: string; features: string[] }[] = [
  {
    id: "free",
    name: "Бесплатный",
    price: "0 ₽",
    features: ["10 000 слов / мес", "Фрагменты до 2 000 знаков"],
  },
  {
    id: "start",
    name: "Старт",
    price: "2 900 ₽/мес",
    features: ["100 000 слов / мес", "AI-оркестрация", "1 глоссарий", "DOCX и PDF"],
  },
  {
    id: "pro",
    name: "Про",
    price: "9 900 ₽/мес",
    features: ["500 000 слов / мес", "Термбаза и TM без лимита", "Все 65+ форматов", "API-доступ"],
  },
];

export default function BillingPage() {
  const [plan, setPlanState] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  async function changePlan(id: string) {
    setSaving(true);
    try {
      const res = await fetch("/api/account/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: id }),
      });
      if (res.ok) setPlanState(id);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell title="Тариф">
      {(user) => {
        const activePlan = plan ?? user.plan;
        return (
          <>
            <div className="tp-plans" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {PLANS.map((p) => {
                const active = activePlan === p.id;
                return (
                  <div key={p.id} className={`tp-plan ${active ? "tp-plan--recommended" : ""}`}>
                    {active ? (
                      <span className="tp-plan__badge">
                        <Badge tone="primary">Текущий</Badge>
                      </span>
                    ) : null}
                    <div className="tp-plan__name">{p.name}</div>
                    <div className="tp-plan__price" style={{ fontSize: 24 }}>
                      {p.price}
                    </div>
                    <ul className="tp-plan__features">
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <Button
                      variant={active ? "secondary" : "primary"}
                      disabled={active || saving}
                      fullWidth
                      onClick={() => changePlan(p.id)}
                    >
                      {active ? "Подключён" : `Перейти на ${p.name}`}
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="tp-app__demo-note">
              Оплата картой (ЮKassa) подключается отдельно — сейчас смена тарифа мгновенная и бесплатная, квота
              обновляется сразу: {(PLAN_QUOTAS[activePlan] ?? PLAN_QUOTAS.free).toLocaleString("ru-RU")} слов/мес.
              Объёмы тарифа «Бизнес» — <Link href="/kontakty">по договору</Link>.
            </div>
          </>
        );
      }}
    </AppShell>
  );
}
