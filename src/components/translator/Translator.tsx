"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { FileDropzone } from "@/components/forms/FileDropzone";

const LANGS = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "Английский" },
  { code: "de", label: "Немецкий" },
  { code: "zh", label: "Китайский" },
  { code: "es", label: "Испанский" },
  { code: "fr", label: "Французский" },
];

const MAX_CHARS = 2000;

/**
 * Бесплатный мгновенный переводчик — уровень Free воронки (концепция, п.1).
 * Вкладка «Текст» вызывает /api/translate; вкладка «Документ» сохраняет
 * прежний демо-сценарий мгновенной оценки файла.
 */
export function Translator({ compact = false }: { compact?: boolean }) {
  const [tab, setTab] = React.useState<"text" | "doc">("text");
  const [source, setSource] = React.useState("ru");
  const [target, setTarget] = React.useState("en");
  const [text, setText] = React.useState("");
  const [result, setResult] = React.useState("");
  const [mode, setMode] = React.useState<"live" | "demo" | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [limitReached, setLimitReached] = React.useState(false);

  // Документ-вкладка: демо мгновенной оценки (как в исходном дизайне hero)
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [quote, setQuote] = React.useState<{ words: string; price: string; eta: string } | null>(null);

  function swap() {
    setSource(target);
    setTarget(source);
    if (result && !error) {
      setText(result);
      setResult("");
      setMode(null);
    }
  }

  async function translate() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, source, target }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Ошибка перевода");
        if (data.limitReached) setLimitReached(true);
        setResult("");
        setMode(null);
      } else {
        setResult(data.translation);
        setMode(data.mode);
      }
    } catch {
      setError("Нет соединения с сервером. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  function handleFiles(files: FileList) {
    setFileName(files[0].name);
    setQuote({ words: "12 400", price: "34 800 ₽", eta: "2 дня" });
  }

  return (
    <div className="tp-translator">
      <div className="tp-translator__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "text"}
          className={`tp-translator__tab ${tab === "text" ? "tp-translator__tab--active" : ""}`}
          onClick={() => setTab("text")}
        >
          Текст
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "doc"}
          className={`tp-translator__tab ${tab === "doc" ? "tp-translator__tab--active" : ""}`}
          onClick={() => setTab("doc")}
        >
          Документ
        </button>
      </div>

      {tab === "text" ? (
        <>
          <div className="tp-translator__panes">
            <div className="tp-translator__pane">
              <div className="tp-translator__pane-head">
                <select
                  className="tp-translator__lang"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  aria-label="Язык оригинала"
                >
                  {LANGS.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
                <span className="tp-translator__count">
                  {text.length}/{MAX_CHARS}
                </span>
              </div>
              <textarea
                className="tp-translator__text"
                placeholder="Вставьте технический текст — до 2 000 знаков бесплатно…"
                value={text}
                maxLength={MAX_CHARS}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <button type="button" className="tp-translator__swap" onClick={swap} aria-label="Поменять языки местами">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m16 3 4 4-4 4" />
                <path d="M20 7H4" />
                <path d="m8 21-4-4 4-4" />
                <path d="M4 17h16" />
              </svg>
            </button>

            <div className="tp-translator__pane">
              <div className="tp-translator__pane-head">
                <select
                  className="tp-translator__lang"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  aria-label="Язык перевода"
                >
                  {LANGS.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
                {mode === "demo" ? <span className="tp-translator__demo-badge">демо-режим</span> : null}
              </div>
              <div className={`tp-translator__output ${result ? "" : "tp-translator__output--empty"}`}>
                {loading ? "Переводим…" : result || "Перевод появится здесь"}
              </div>
            </div>
          </div>

          {error ? <div className="tp-translator__error">{error}</div> : null}

          <div className="tp-translator__foot">
            <Button variant="primary" size={compact ? "md" : "lg"} onClick={translate} disabled={loading || !text.trim()}>
              {loading ? "Переводим…" : "Перевести"}
            </Button>
            <span className="tp-translator__note">
              {limitReached ? (
                <>
                  Лимит исчерпан — <Link href="/tarify">смотрите тарифы</Link>
                </>
              ) : (
                <>
                  Бесплатно до 2 000 знаков. Больше объёмы и AI-оркестрация — <Link href="/tarify">в подписке</Link>
                </>
              )}
            </span>
          </div>
        </>
      ) : (
        <>
          <FileDropzone
            hint="DOCX, PDF, XLIFF, JSON"
            state={fileName ? "done" : "idle"}
            fileName={fileName ?? undefined}
            onFiles={handleFiles}
          />
          {quote ? (
            <Card variant="glass" padding="sm">
              <div className="tp-hero__estimate-row">
                <div>
                  <div className="tp-hero__estimate-value">{quote.words}</div>
                  <div className="tp-hero__estimate-label">слов</div>
                </div>
                <div>
                  <div className="tp-hero__estimate-value">{quote.price}</div>
                  <div className="tp-hero__estimate-label">оценка стоимости</div>
                </div>
                <div>
                  <div className="tp-hero__estimate-value">{quote.eta}</div>
                  <div className="tp-hero__estimate-label">срок</div>
                </div>
              </div>
            </Card>
          ) : null}
          <span className="tp-translator__note">
            Перевод документов с сохранением вёрстки — <Link href="/app">в кабинете</Link>
          </span>
        </>
      )}
    </div>
  );
}
