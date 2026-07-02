"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { Input } from "@/components/forms/Input";
import { INDUSTRIES } from "@/data/site";
import type { SiteContent } from "@/lib/site-content";

type Tab = "seo" | "home" | "tarify";

const TABS: { id: Tab; label: string }[] = [
  { id: "seo", label: "SEO-метатеги" },
  { id: "home", label: "Тексты главной" },
  { id: "tarify", label: "Тарифы" },
];

type MetaPageKey = Exclude<keyof SiteContent["meta"], "otrasli">;

const META_PAGES: { key: MetaPageKey; label: string }[] = [
  { key: "home", label: "Главная (/)" },
  { key: "o-nas", label: "О нас (/o-nas)" },
  { key: "blog", label: "Блог (/blog)" },
  { key: "kontakty", label: "Контакты (/kontakty)" },
  { key: "perevodchik", label: "Переводчик (/perevodchik)" },
  { key: "tarify", label: "Тарифы (/tarify)" },
  { key: "product/orchestrator", label: "Продукт: Оркестратор" },
  { key: "product/terminology", label: "Продукт: Термбаза" },
  { key: "product/api", label: "Продукт: API" },
];

function TextField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  if (multiline) {
    return (
      <label className="tp-field">
        <span className="tp-field__label">{label}</span>
        <textarea
          className="tp-admin__textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      </label>
    );
  }
  return <Input label={label} value={value} onChange={(e) => onChange(e.target.value)} />;
}

export function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = React.useState<SiteContent>(initialContent);
  const [tab, setTab] = React.useState<Tab>("seo");
  const [saving, setSaving] = React.useState(false);
  const [toast, setToast] = React.useState<{ kind: "ok" | "error"; text: string } | null>(null);

  function updateMeta(key: MetaPageKey, field: "title" | "description", value: string) {
    setContent((prev) => ({
      ...prev,
      meta: { ...prev.meta, [key]: { ...(prev.meta[key] as any), [field]: value } },
    }));
  }

  function updateOtrasliMeta(slug: string, field: "title" | "description", value: string) {
    setContent((prev) => {
      const current = prev.meta.otrasli[slug] || { title: "", description: "" };
      return {
        ...prev,
        meta: { ...prev.meta, otrasli: { ...prev.meta.otrasli, [slug]: { ...current, [field]: value } } },
      };
    });
  }

  function updateHome(field: keyof SiteContent["home"], value: string) {
    setContent((prev) => ({ ...prev, home: { ...prev.home, [field]: value } }));
  }

  function updateTarify(field: keyof SiteContent["tarify"], value: string) {
    setContent((prev) => ({ ...prev, tarify: { ...prev.tarify, [field]: value } as SiteContent["tarify"] }));
  }

  function updatePlan(planId: keyof SiteContent["tarify"]["plans"], field: "name" | "price" | "per" | "desc", value: string) {
    setContent((prev) => ({
      ...prev,
      tarify: {
        ...prev.tarify,
        plans: { ...prev.tarify.plans, [planId]: { ...prev.tarify.plans[planId], [field]: value } },
      },
    }));
  }

  async function save() {
    setSaving(true);
    setToast(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setContent(data.content);
      setToast({ kind: "ok", text: "Сохранено" });
      router.refresh();
    } catch {
      setToast({ kind: "error", text: "Не удалось сохранить — попробуйте ещё раз" });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 4000);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="tp-app">
      <div className="tp-app__main" style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
        <div className="tp-app__topbar">
          <h1 className="tp-app__title">Админ-панель techperevod.com</h1>
          <div className="tp-app__user">
            <Button variant="ghost" size="sm" as="a" href="/" target="_blank">
              Открыть сайт
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              Выйти
            </Button>
          </div>
        </div>

        <div className="tp-app__content">
          <div className="tp-admin__tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`tp-admin__tab ${tab === t.id ? "tp-admin__tab--active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "seo" ? (
            <div className="tp-admin__grid">
              {META_PAGES.map(({ key, label }) => (
                <Card key={key} padding="lg" className="tp-admin__card">
                  <div className="tp-admin__card-title">{label}</div>
                  <TextField
                    label="Title"
                    value={content.meta[key].title}
                    onChange={(v) => updateMeta(key, "title", v)}
                  />
                  <TextField
                    label="Description"
                    value={content.meta[key].description}
                    onChange={(v) => updateMeta(key, "description", v)}
                    multiline
                  />
                </Card>
              ))}
              {INDUSTRIES.map((industry) => {
                const override = content.meta.otrasli[industry.slug];
                return (
                  <Card key={industry.slug} padding="lg" className="tp-admin__card">
                    <div className="tp-admin__card-title">Отрасль: {industry.name}</div>
                    <TextField
                      label="Title"
                      value={override?.title ?? industry.heroTitle}
                      onChange={(v) => updateOtrasliMeta(industry.slug, "title", v)}
                    />
                    <TextField
                      label="Description"
                      value={override?.description ?? industry.heroSubtitle}
                      onChange={(v) => updateOtrasliMeta(industry.slug, "description", v)}
                      multiline
                    />
                  </Card>
                );
              })}
            </div>
          ) : null}

          {tab === "home" ? (
            <div className="tp-admin__grid">
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">Верхний блок — заголовок фиксированный, редактируется подзаголовок</div>
                <TextField label="Подзаголовок" value={content.home.heroSubtitle} onChange={(v) => updateHome("heroSubtitle", v)} multiline />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">Сравнение (блок «Онлайн-переводчик, бюро или платформа?»)</div>
                <TextField label="Заголовок" value={content.home.comparisonTitle} onChange={(v) => updateHome("comparisonTitle", v)} />
                <TextField label="Подзаголовок" value={content.home.comparisonSubtitle} onChange={(v) => updateHome("comparisonSubtitle", v)} multiline />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">«Четыре шага до готового перевода»</div>
                <TextField label="Подзаголовок" value={content.home.howItWorksSubtitle} onChange={(v) => updateHome("howItWorksSubtitle", v)} multiline />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">AI-оркестратор</div>
                <TextField label="Заголовок" value={content.home.orchestratorTitle} onChange={(v) => updateHome("orchestratorTitle", v)} />
                <TextField label="Подзаголовок" value={content.home.orchestratorSubtitle} onChange={(v) => updateHome("orchestratorSubtitle", v)} multiline />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">«Почему techperevod»</div>
                <TextField label="Заголовок" value={content.home.whyTitle} onChange={(v) => updateHome("whyTitle", v)} />
                <TextField label="Подзаголовок" value={content.home.whySubtitle} onChange={(v) => updateHome("whySubtitle", v)} multiline />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">«Разница видна»</div>
                <TextField label="Заголовок" value={content.home.beforeAfterTitle} onChange={(v) => updateHome("beforeAfterTitle", v)} />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">Тарифы (блок на главной)</div>
                <TextField label="Заголовок" value={content.home.pricingTitle} onChange={(v) => updateHome("pricingTitle", v)} />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">Термбаза</div>
                <TextField label="Заголовок" value={content.home.glossaryTitle} onChange={(v) => updateHome("glossaryTitle", v)} />
                <TextField label="Подзаголовок" value={content.home.glossarySubtitle} onChange={(v) => updateHome("glossarySubtitle", v)} multiline />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">«Кому подходит платформа»</div>
                <TextField label="Заголовок" value={content.home.audienceTitle} onChange={(v) => updateHome("audienceTitle", v)} />
                <TextField label="Подзаголовок" value={content.home.audienceSubtitle} onChange={(v) => updateHome("audienceSubtitle", v)} multiline />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">Форматы</div>
                <TextField label="Заголовок" value={content.home.formatsTitle} onChange={(v) => updateHome("formatsTitle", v)} />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">Цифры/доказательства</div>
                <TextField label="Заголовок" value={content.home.proofTitle} onChange={(v) => updateHome("proofTitle", v)} />
                <TextField label="Подзаголовок" value={content.home.proofSubtitle} onChange={(v) => updateHome("proofSubtitle", v)} multiline />
              </Card>
            </div>
          ) : null}

          {tab === "tarify" ? (
            <div className="tp-admin__grid">
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">Заголовок страницы</div>
                <TextField label="Заголовок" value={content.tarify.heroTitle} onChange={(v) => updateTarify("heroTitle", v)} />
                <TextField label="Подзаголовок" value={content.tarify.heroSubtitle} onChange={(v) => updateTarify("heroSubtitle", v)} multiline />
              </Card>
              {(["free", "start", "pro", "business"] as const).map((planId) => (
                <Card key={planId} padding="lg" className="tp-admin__card">
                  <div className="tp-admin__card-title">Тариф: {content.tarify.plans[planId].name}</div>
                  <TextField label="Название" value={content.tarify.plans[planId].name} onChange={(v) => updatePlan(planId, "name", v)} />
                  <TextField label="Цена" value={content.tarify.plans[planId].price} onChange={(v) => updatePlan(planId, "price", v)} />
                  <TextField label="Период (напр. /мес)" value={content.tarify.plans[planId].per} onChange={(v) => updatePlan(planId, "per", v)} />
                  <TextField label="Описание" value={content.tarify.plans[planId].desc} onChange={(v) => updatePlan(planId, "desc", v)} multiline />
                </Card>
              ))}
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">«Уровень 3 — проверка человеком»</div>
                <TextField label="Заголовок" value={content.tarify.addonTitle} onChange={(v) => updateTarify("addonTitle", v)} />
                <TextField label="Подзаголовок" value={content.tarify.addonSubtitle} onChange={(v) => updateTarify("addonSubtitle", v)} multiline />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">Аддон: Редактор-инженер</div>
                <TextField label="Заголовок" value={content.tarify.addonEngineerTitle} onChange={(v) => updateTarify("addonEngineerTitle", v)} />
                <TextField label="Описание" value={content.tarify.addonEngineerDesc} onChange={(v) => updateTarify("addonEngineerDesc", v)} multiline />
              </Card>
              <Card padding="lg" className="tp-admin__card">
                <div className="tp-admin__card-title">Аддон: Носитель языка</div>
                <TextField label="Заголовок" value={content.tarify.addonNativeTitle} onChange={(v) => updateTarify("addonNativeTitle", v)} />
                <TextField label="Описание" value={content.tarify.addonNativeDesc} onChange={(v) => updateTarify("addonNativeDesc", v)} multiline />
              </Card>
            </div>
          ) : null}
        </div>
      </div>

      <div className="tp-admin__save-bar">
        <Button variant="primary" size="lg" onClick={save} disabled={saving}>
          {saving ? "Сохранение…" : "Сохранить изменения"}
        </Button>
      </div>

      {toast ? <div className={`tp-admin__toast tp-admin__toast--${toast.kind}`}>{toast.text}</div> : null}
    </div>
  );
}
