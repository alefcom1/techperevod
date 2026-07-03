"use client";

import React from "react";
import { Button } from "@/components/core/Button";
import { DEMO_API_KEY } from "@/lib/api-keys";

const LANGS = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "Английский" },
  { code: "de", label: "Немецкий" },
  { code: "zh", label: "Китайский" },
  { code: "es", label: "Испанский" },
  { code: "fr", label: "Французский" },
];

/**
 * Живой тестер /api/v1/translate прямо на странице документации — вызывает
 * настоящий эндпоинт с публичным демо-ключом (DEMO_API_KEY), без сервера
 * посредника. Доказывает, что API реально работает, а не только описан.
 */
export function ApiTryIt() {
  const [text, setText] = React.useState("Перед запуском насоса переведите клапан в положение «закрыто».");
  const [source, setSource] = React.useState("ru");
  const [target, setTarget] = React.useState("en");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<{ translation: string; model: string; words: number } | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function run() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/v1/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${DEMO_API_KEY}` },
        body: JSON.stringify({ text, source, target }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Ошибка запроса");
        return;
      }
      setResult(data);
    } catch {
      setError("Нет соединения с сервером");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tp-api-try">
      <div className="tp-api-try__row">
        <label className="tp-field" style={{ flex: "none", width: 180 }}>
          <span className="tp-field__label">Откуда</span>
          <span className="tp-field__control">
            <select className="tp-input" value={source} onChange={(e) => setSource(e.target.value)}>
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </span>
        </label>
        <label className="tp-field" style={{ flex: "none", width: 180 }}>
          <span className="tp-field__label">Куда</span>
          <span className="tp-field__control">
            <select className="tp-input" value={target} onChange={(e) => setTarget(e.target.value)}>
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      <textarea
        className="tp-api-try__textarea"
        value={text}
        maxLength={5000}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите технический текст для перевода…"
      />

      <div className="tp-api-try__row">
        <Button variant="primary" onClick={run} disabled={loading || !text.trim()}>
          {loading ? "Отправляем запрос…" : "Отправить запрос к API"}
        </Button>
        <span className="tp-api-try__note">
          Живой вызов POST /api/v1/translate с демо-ключом <code>{DEMO_API_KEY}</code>
        </span>
      </div>

      {error ? <div className="tp-translator__error">{error}</div> : null}

      {result ? (
        <pre className="tp-api-try__result">
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}
