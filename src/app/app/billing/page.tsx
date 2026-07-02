"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { setPlan, PLAN_QUOTAS, type DemoUser } from "@/lib/demo-account";

const PLANS: { id: DemoUser["plan"]; name: string; price: string; features: string[] }[] = [
  {
    id: "free",
    name: "Free",
    price: "0 ₽",
    features: ["10 000 слов / мес", "Фрагменты до 2 000 знаков"],
  },
  {
    id: "start",
    name: "Start",
    price: "2 900 ₽/мес",
    features: ["100 000 слов / мес", "AI-оркестрация", "1 глоссарий", "DOCX и PDF"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "9 900 ₽/мес",
    features: ["500 000 слов / мес", "Термбаза и TM без лимита", "Все 65+ форматов", "API-доступ"],
  },
];

export default function BillingPage() {
  const [, force] = React.useReducer((x: number) => x + 1, 0);

  return (
    <AppShell title="Тариф">
      {(user) => (
        <>
          <div className="tp-plans" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {PLANS.map((plan) => {
              const active = user.plan === plan.id;
              return (
                <div key={plan.id} className={`tp-plan ${active ? "tp-plan--recommended" : ""}`}>
                  {active ? (
                    <span className="tp-plan__badge">
                      <Badge tone="primary">Текущий</Badge>
                    </span>
                  ) : null}
                  <div className="tp-plan__name">{plan.name}</div>
                  <div className="tp-plan__price" style={{ fontSize: 24 }}>
                    {plan.price}
                  </div>
                  <ul className="tp-plan__features">
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Button
                    variant={active ? "secondary" : "primary"}
                    disabled={active}
                    fullWidth
                    onClick={() => {
                      setPlan(plan.id);
                      force();
                    }}
                  >
                    {active ? "Подключён" : `Перейти на ${plan.name}`}
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="tp-app__demo-note">
            Оплата картой (ЮKassa) подключается с запуском биллинга — в демо смена тарифа мгновенная и бесплатная,
            квота обновляется сразу: сейчас {PLAN_QUOTAS[user.plan].toLocaleString("ru-RU")} слов/мес. Объёмы
            Business — <Link href="/kontakty">по договору</Link>.
          </div>
        </>
      )}
    </AppShell>
  );
}
