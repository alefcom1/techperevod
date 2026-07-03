"use client";

import React from "react";
import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/core/Card";
import { Button } from "@/components/core/Button";
import { Input } from "@/components/forms/Input";

interface GlossaryTerm {
  id: string;
  ru: string;
  en: string;
}

export default function GlossaryPage() {
  const [terms, setTerms] = React.useState<GlossaryTerm[]>([]);
  const [ru, setRu] = React.useState("");
  const [en, setEn] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  function load() {
    fetch("/api/glossary")
      .then((res) => res.json())
      .then((data) => setTerms(data.terms ?? []))
      .finally(() => setLoading(false));
  }

  React.useEffect(load, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!ru.trim() || !en.trim()) return;
    setError(null);
    const res = await fetch("/api/glossary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ru: ru.trim(), en: en.trim() }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Не удалось добавить термин");
      return;
    }
    setTerms((prev) => [...prev, data.term]);
    setRu("");
    setEn("");
  }

  async function remove(id: string) {
    setTerms((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/glossary/${id}`, { method: "DELETE" });
  }

  return (
    <AppShell title="Термбаза">
      {() => (
        <>
          <Card padding="lg">
            <div className="tp-value-card__title" style={{ fontSize: 18, marginBottom: 8 }}>
              Добавить термин
            </div>
            <p className="tp-value-card__desc" style={{ marginBottom: "var(--tp-space-4)" }}>
              Утверждённые термины подставляются в перевод и попадают в отчёт о качестве для каждого заказа.
            </p>
            <form onSubmit={add} className="tp-contact-form__row" style={{ alignItems: "end", gap: "var(--tp-space-4)" }}>
              <Input label="Термин (RU)" mono placeholder="обратный клапан" value={ru} onChange={(e) => setRu(e.target.value)} />
              <Input label="Перевод (EN)" mono placeholder="check valve" value={en} onChange={(e) => setEn(e.target.value)} />
              <Button type="submit" variant="primary">
                Добавить
              </Button>
            </form>
            {error ? <span style={{ color: "#E5484D", fontSize: 14 }}>{error}</span> : null}
          </Card>

          <Card padding="lg">
            <div className="tp-value-card__title" style={{ fontSize: 18, marginBottom: "var(--tp-space-4)" }}>
              Термины · {terms.length}
            </div>
            <table className="tp-app-table">
              <thead>
                <tr>
                  <th>Термин (RU)</th>
                  <th>Перевод (EN)</th>
                  <th aria-label="Действия" />
                </tr>
              </thead>
              <tbody>
                {terms.map((t) => (
                  <tr key={t.id}>
                    <td className="tp-mono">{t.ru}</td>
                    <td className="tp-mono">{t.en}</td>
                    <td style={{ textAlign: "right" }}>
                      <Button size="sm" variant="ghost" onClick={() => remove(t.id)}>
                        Удалить
                      </Button>
                    </td>
                  </tr>
                ))}
                {!loading && terms.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ color: "var(--tp-text-muted)" }}>
                      Термбаза пуста — добавьте первый термин выше
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </AppShell>
  );
}
