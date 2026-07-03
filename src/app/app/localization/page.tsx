"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/core/Card";
import { Button } from "@/components/core/Button";
import { Input } from "@/components/forms/Input";
import { Badge } from "@/components/core/Badge";

const LANGS = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "Английский" },
  { code: "de", label: "Немецкий" },
  { code: "zh", label: "Китайский" },
  { code: "es", label: "Испанский" },
  { code: "fr", label: "Французский" },
];

interface Site {
  id: string;
  domain: string;
  siteKey: string;
  sourceLang: string;
  targetLangs: string;
  createdAt: string;
  _count: { translations: number };
}

function snippetFor(site: Site): string {
  const targets = (JSON.parse(site.targetLangs) as string[]).join(",");
  return `<script src="https://techperevod.com/widget.js"\n  data-site="${site.siteKey}"\n  data-source="${site.sourceLang}"\n  data-langs="${targets}"></script>`;
}

export default function LocalizationPage() {
  const [sites, setSites] = React.useState<Site[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [domain, setDomain] = React.useState("");
  const [sourceLang, setSourceLang] = React.useState("ru");
  const [targetLangs, setTargetLangs] = React.useState<string[]>(["en"]);
  const [error, setError] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  function load() {
    fetch("/api/widget/sites")
      .then((res) => res.json())
      .then((data) => setSites(data.sites ?? []))
      .finally(() => setLoading(false));
  }

  React.useEffect(load, []);

  function toggleTarget(code: string) {
    setTargetLangs((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
  }

  async function createSite(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/widget/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: domain.trim(), sourceLang, targetLangs: targetLangs.filter((l) => l !== sourceLang) }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Не удалось создать сайт");
      return;
    }
    setDomain("");
    load();
  }

  async function removeSite(id: string) {
    setSites((prev) => prev.filter((s) => s.id !== id));
    await fetch(`/api/widget/sites/${id}`, { method: "DELETE" });
  }

  function copySnippet(site: Site) {
    navigator.clipboard.writeText(snippetFor(site)).then(() => {
      setCopiedId(site.id);
      setTimeout(() => setCopiedId(null), 1600);
    });
  }

  return (
    <AppShell title="Локализация сайта">
      {() => (
        <>
          <Card padding="lg">
            <div className="tp-value-card__title" style={{ fontSize: 18, marginBottom: 8 }}>
              Добавить сайт
            </div>
            <p className="tp-value-card__desc" style={{ marginBottom: "var(--tp-space-4)" }}>
              JS-виджет обходит видимые тексты на странице и переводит их на лету — без переделки кода клиента.
              Это PoC: перевод кэшируется по странице, редактировать перевод можно вручную ниже.
            </p>
            <form onSubmit={createSite} style={{ display: "flex", flexDirection: "column", gap: "var(--tp-space-4)" }}>
              <Input
                label="Домен"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
              />
              <div>
                <span className="tp-field__label">Язык оригинала сайта</span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      className={`tp-translator__tab ${sourceLang === l.code ? "tp-translator__tab--active" : ""}`}
                      onClick={() => setSourceLang(l.code)}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="tp-field__label">Целевые языки виджета</span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                  {LANGS.filter((l) => l.code !== sourceLang).map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      className={`tp-translator__tab ${targetLangs.includes(l.code) ? "tp-translator__tab--active" : ""}`}
                      onClick={() => toggleTarget(l.code)}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
              {error ? <span style={{ color: "#E5484D", fontSize: 14 }}>{error}</span> : null}
              <div>
                <Button type="submit" variant="primary">
                  Создать сайт и получить сниппет
                </Button>
              </div>
            </form>
          </Card>

          <Card padding="lg">
            <div className="tp-value-card__title" style={{ fontSize: 18, marginBottom: "var(--tp-space-4)" }}>
              Ваши сайты · {sites.length}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--tp-space-5)" }}>
              {sites.map((site) => (
                <div key={site.id} style={{ border: "1px solid var(--tp-border)", borderRadius: "var(--tp-radius-md)", padding: "var(--tp-space-4)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    <div>
                      <div className="tp-value-card__title" style={{ fontSize: 16 }}>
                        {site.domain}
                      </div>
                      <div className="tp-value-card__desc" style={{ fontSize: 13 }}>
                        {site.sourceLang.toUpperCase()} → {(JSON.parse(site.targetLangs) as string[]).map((l) => l.toUpperCase()).join(", ")}
                      </div>
                    </div>
                    <Badge tone="neutral" size="sm">
                      {site._count.translations} фрагментов в кэше
                    </Badge>
                  </div>
                  <pre className="tp-mono" style={{ background: "var(--tp-surface-sunken)", padding: 12, borderRadius: 8, fontSize: 12, overflowX: "auto", marginBottom: 8 }}>
                    {snippetFor(site)}
                  </pre>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Button size="sm" variant="secondary" onClick={() => copySnippet(site)}>
                      {copiedId === site.id ? "Скопировано" : "Скопировать сниппет"}
                    </Button>
                    <Button size="sm" variant="ghost" as="a" href={`/app/localization/${site.id}`}>
                      Переводы ({site._count.translations})
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => removeSite(site.id)}>
                      Удалить сайт
                    </Button>
                  </div>
                </div>
              ))}
              {!loading && sites.length === 0 ? (
                <span className="tp-translator__note">Пока нет сайтов — добавьте первый выше.</span>
              ) : null}
            </div>
          </Card>

          <Card padding="lg">
            <div className="tp-value-card__title" style={{ fontSize: 16, marginBottom: 8 }}>
              Живая демонстрация
            </div>
            <p className="tp-value-card__desc">
              Посмотреть, как виджет работает на реальной странице — <Link href="/widget-demo.html">демо-страница</Link>{" "}
              (открывается отдельно, имитирует чужой сайт с вставленным сниппетом).
            </p>
          </Card>
        </>
      )}
    </AppShell>
  );
}
