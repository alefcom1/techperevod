"use client";

import React from "react";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { FileDropzone } from "@/components/forms/FileDropzone";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { LanguageTagsField, type LanguageEntry, type LanguageScore } from "@/components/translators/LanguageTagsField";
import { TranslatorTestModal } from "@/components/translators/TranslatorTestModal";
import { EMPLOYMENT_TYPES, PUNCTUALITY_OPTIONS, URGENT_WORK_OPTIONS, WORK_TYPES } from "@/data/translators";

/** Анкета соискателя-переводчика: react-порт anketa_fixed.js под наш стек.
 * Отправляется в /api/translator-applications, который пересылает данные
 * в ТМС бюро (tms.perevod4.ru) и дублирует уведомление на почту. */
export function TranslatorApplicationForm() {
  const [languages, setLanguages] = React.useState<LanguageEntry[]>([]);
  const [scores, setScores] = React.useState<Record<string, LanguageScore>>({});
  const [testingLang, setTestingLang] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handleTestComplete(lang: string, result: LanguageScore) {
    setScores((s) => ({ ...s, [lang]: result }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!languages.length) {
      setError("Укажите хотя бы один иностранный язык");
      return;
    }

    const form = e.currentTarget;
    const g = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null)?.value ?? "";

    setSubmitting(true);
    try {
      let diplomaUrl = "";
      if (file) {
        const fd = new FormData();
        fd.append("diploma", file);
        const upRes = await fetch("/api/translator-applications/diploma", { method: "POST", body: fd });
        const upData = await upRes.json();
        if (upRes.ok) diplomaUrl = upData.url || "";
      }

      const testScores = Object.fromEntries(
        Object.entries(scores).map(([lang, s]) => [lang, { score: s.score, feedback: s.feedback, date: s.date }])
      );

      const payload = {
        website: "",
        last_name: g("last_name"),
        first_name: g("first_name"),
        middle_name: g("middle_name") || null,
        birth_date: g("birth_date") || null,
        phone: g("phone") || null,
        email: g("email"),
        languages: languages.map((l) => ({ lang: l.name, level: l.level })),
        test_scores: Object.keys(testScores).length ? testScores : null,
        employment_type: g("employment_type") || null,
        work_type: g("work_type") || null,
        workload: g("workload") || null,
        productivity: g("productivity") || null,
        urgent_works: g("urgent_works") || null,
        urgency_concept: g("urgency_concept") || null,
        salary_level: g("salary_level") || null,
        punctuality: g("punctuality") ? parseInt(g("punctuality"), 10) : null,
        pc_skills: g("pc_skills") || null,
        cat_tools: g("cat_tools") || null,
        diploma_path: diplomaUrl || null,
        comment: g("comment") || null,
      };

      const res = await fetch("/api/translator-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Не удалось отправить анкету");
        return;
      }
      setSent(true);
    } catch {
      setError("Нет соединения с сервером. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <Card variant="elevated" padding="lg" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <Icon name="shield-check" color="var(--tp-accent)" size={32} />
        <p style={{ marginTop: 16, color: "var(--tp-text)" }}>
          Анкета отправлена. Мы свяжемся с вами при поступлении подходящих заказов.
        </p>
      </Card>
    );
  }

  return (
    <>
      <form className="tp-contact-form" onSubmit={submit}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />

        <div className="tp-contact-form__row">
          <Input name="last_name" label="Фамилия" placeholder="Иванов" required />
          <Input name="first_name" label="Имя" placeholder="Иван" required />
        </div>
        <div className="tp-contact-form__row">
          <Input name="middle_name" label="Отчество" placeholder="Иванович" />
          <Input name="birth_date" label="Дата рождения" type="date" />
        </div>
        <div className="tp-contact-form__row">
          <Input name="phone" label="Телефон" type="tel" placeholder="+7 900 123-45-67" />
          <Input name="email" label="Email" type="email" placeholder="you@example.com" required />
        </div>

        <div className="tp-field">
          <span className="tp-field__label">Языковые пары</span>
          <LanguageTagsField languages={languages} scores={scores} onChange={setLanguages} onStartTest={setTestingLang} />
        </div>

        <div className="tp-contact-form__row">
          <Select name="employment_type" label="Вид занятости" placeholder="Не указано" options={EMPLOYMENT_TYPES} />
          <Select name="work_type" label="Тип работы" placeholder="Не указано" options={WORK_TYPES} />
        </div>
        <div className="tp-contact-form__row">
          <Input name="workload" label="Загруженность" placeholder="напр. 6 ч/день" />
          <Input name="productivity" label="Производительность" placeholder="напр. 8–10 стр/день" />
        </div>
        <div className="tp-contact-form__row">
          <Select name="urgent_works" label="Готовы к срочным заказам?" placeholder="Не указано" options={URGENT_WORK_OPTIONS} />
          <Input name="urgency_concept" label="Что считаете срочным заказом" placeholder="напр. менее 24 часов" />
        </div>
        <div className="tp-contact-form__row">
          <Input name="salary_level" label="Ожидания по оплате" placeholder="напр. 250–350 ₽/стр" />
          <Select name="punctuality" label="Пунктуальность (самооценка)" placeholder="Не указано" options={PUNCTUALITY_OPTIONS} />
        </div>
        <div className="tp-contact-form__row">
          <Input name="pc_skills" label="ПК и программы" placeholder="MS Office, Adobe Acrobat…" />
          <Input name="cat_tools" label="CAT-инструменты" placeholder="SDL Trados, memoQ…" />
        </div>

        <Input name="comment" label="Комментарий" placeholder="Опыт работы, специализация, что ещё стоит знать" />

        <FileDropzone
          hint="Диплом или сертификат — необязательно, до 10 МБ"
          state={file ? "done" : "idle"}
          fileName={file?.name}
          onFiles={(files) => setFile(files[0])}
        />

        {error ? <div className="tp-translator__error">{error}</div> : null}
        <Button type="submit" size="lg" variant="primary" fullWidth disabled={submitting}>
          {submitting ? "Отправляем…" : "Отправить анкету"}
        </Button>
      </form>

      {testingLang ? (
        <TranslatorTestModal
          lang={testingLang}
          onClose={() => setTestingLang(null)}
          onComplete={(result) => handleTestComplete(testingLang, result)}
        />
      ) : null}
    </>
  );
}
