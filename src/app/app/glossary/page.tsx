"use client";

import React from "react";
import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/core/Card";
import { Button } from "@/components/core/Button";
import { Input } from "@/components/forms/Input";
import { getGlossary, addTerm, removeTerm, type GlossaryTerm } from "@/lib/demo-account";

export default function GlossaryPage() {
  const [terms, setTerms] = React.useState<GlossaryTerm[]>([]);
  const [ru, setRu] = React.useState("");
  const [en, setEn] = React.useState("");

  React.useEffect(() => {
    setTerms(getGlossary());
  }, []);

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!ru.trim() || !en.trim()) return;
    addTerm(ru.trim(), en.trim());
    setTerms(getGlossary());
    setRu("");
    setEn("");
  }

  function remove(id: string) {
    removeTerm(id);
    setTerms(getGlossary());
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
              Утверждённые термины подставляются в каждый перевод — и для AI, и для редактора.
            </p>
            <form onSubmit={add} className="tp-contact-form__row" style={{ alignItems: "end", gap: "var(--tp-space-4)" }}>
              <Input label="Термин (RU)" mono placeholder="обратный клапан" value={ru} onChange={(e) => setRu(e.target.value)} />
              <Input label="Перевод (EN)" mono placeholder="check valve" value={en} onChange={(e) => setEn(e.target.value)} />
              <Button type="submit" variant="primary">
                Добавить
              </Button>
            </form>
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
                {terms.length === 0 ? (
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
