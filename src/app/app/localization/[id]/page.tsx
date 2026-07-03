"use client";

import React from "react";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/core/Card";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";

interface Translation {
  id: string;
  pageUrl: string;
  targetLang: string;
  sourceText: string;
  translation: string;
  editedByUser: boolean;
  updatedAt: string;
}

function Row({ t, siteId, onSaved }: { t: Translation; siteId: string; onSaved: (t: Translation) => void }) {
  const [value, setValue] = React.useState(t.translation);
  const [saving, setSaving] = React.useState(false);

  async function save() {
    if (value.trim() === t.translation) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/widget/sites/${siteId}/translations/${t.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ translation: value.trim() }),
      });
      const data = await res.json();
      if (res.ok) onSaved(data.translation);
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr>
      <td className="tp-mono" style={{ maxWidth: 320 }}>{t.sourceText}</td>
      <td>
        <textarea
          className="tp-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={2}
          style={{ width: "100%", fontFamily: "var(--tp-font-mono)", fontSize: 13 }}
        />
      </td>
      <td className="tp-mono">{t.targetLang.toUpperCase()}</td>
      <td>{t.editedByUser ? <Badge tone="accent" size="sm">правка вручную</Badge> : <Badge tone="neutral" size="sm">AI</Badge>}</td>
      <td>
        <Button size="sm" variant="secondary" onClick={save} disabled={saving || value.trim() === t.translation}>
          {saving ? "Сохраняем…" : "Сохранить"}
        </Button>
      </td>
    </tr>
  );
}

export default function SiteTranslationsPage() {
  const params = useParams<{ id: string }>();
  const [translations, setTranslations] = React.useState<Translation[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`/api/widget/sites/${params.id}/translations`)
      .then((res) => res.json())
      .then((data) => setTranslations(data.translations ?? []))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <AppShell title="Переводы сайта">
      {() => (
        <Card padding="lg">
          <div className="tp-value-card__title" style={{ fontSize: 18, marginBottom: 8 }}>
            Закэшированные фрагменты · {translations.length}
          </div>
          <p className="tp-value-card__desc" style={{ marginBottom: "var(--tp-space-4)" }}>
            Каждая строка — фрагмент текста, который виджет уже перевёл на живой странице. Поправьте перевод и
            сохраните — виджет отдаст вашу версию при следующем заходе посетителя, автоперевод её не перезапишет.
          </p>
          <table className="tp-app-table">
            <thead>
              <tr>
                <th>Оригинал</th>
                <th>Перевод</th>
                <th>Язык</th>
                <th>Источник</th>
                <th aria-label="Действия" />
              </tr>
            </thead>
            <tbody>
              {translations.map((t) => (
                <Row
                  key={t.id}
                  t={t}
                  siteId={params.id}
                  onSaved={(updated) => setTranslations((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))}
                />
              ))}
              {!loading && translations.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ color: "var(--tp-text-muted)" }}>
                    Пока пусто — переводы появятся здесь после первого захода посетителя на сайт с виджетом.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </Card>
      )}
    </AppShell>
  );
}
