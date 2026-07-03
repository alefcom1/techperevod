"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { FileDropzone } from "@/components/forms/FileDropzone";
import { reachGoal } from "@/lib/metrika";

const AUTO = "auto";

const LANGS = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "Английский" },
  { code: "de", label: "Немецкий" },
  { code: "zh", label: "Китайский" },
  { code: "es", label: "Испанский" },
  { code: "fr", label: "Французский" },
];

const LANG_CODES = new Set(LANGS.map((l) => l.code));

const MAX_CHARS = 2000;
const MIN_CHARS_AUTO = 3; // порог автоперевода
const DEBOUNCE_MS = 1000;
const UPSELL_AT = 0.8; // мягкий апселл при заполнении счётчика на 80%
const LANGS_STORAGE_KEY = "tp-translator-langs";

/**
 * Бесплатный мгновенный переводчик — уровень Free воронки (концепция, п.1).
 * Вкладка «Текст» вызывает /api/translate: автоперевод с дебаунсом при паузе
 * в наборе, автоопределение языка, обмен языков местами, счётчик лимита и
 * оценка перевода (цели Метрики). Вкладка «Документ» сохраняет прежний
 * демо-сценарий мгновенной оценки файла.
 */
export function Translator({ onQuoteCreated }: { onQuoteCreated?: (orderId: string) => void } = {}) {
  const [tab, setTab] = React.useState<"text" | "doc">("text");
  const [source, setSource] = React.useState("ru");
  const [target, setTarget] = React.useState("en");
  const [text, setText] = React.useState("");
  const [result, setResult] = React.useState("");
  const [mode, setMode] = React.useState<"live" | "demo" | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [limitReached, setLimitReached] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [rating, setRating] = React.useState<"up" | "down" | null>(null);

  const sourceRef = React.useRef<HTMLTextAreaElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);
  // ключ «текст+пара» последнего отправленного запроса — не дублируем запросы
  const lastKeyRef = React.useRef<string>("");
  const hydratedRef = React.useRef(false);
  const copiedTimerRef = React.useRef<number | undefined>(undefined);

  // Документ-вкладка: реальная мгновенная оценка через /api/quote
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [quote, setQuote] = React.useState<{ words: string; price: string; eta: string; note?: string } | null>(null);
  const [docState, setDocState] = React.useState<"idle" | "loading" | "done" | "error">("idle");
  const [docError, setDocError] = React.useState<string | null>(null);

  // Восстанавливаем языковую пару из localStorage (после монтирования — SSR-safe)
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(LANGS_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { source?: string; target?: string };
        if (saved.source && (saved.source === AUTO || LANG_CODES.has(saved.source))) setSource(saved.source);
        if (saved.target && LANG_CODES.has(saved.target)) setTarget(saved.target);
      }
    } catch {
      // повреждённое значение — игнорируем
    }
    hydratedRef.current = true;
  }, []);

  // Сохраняем выбранную пару
  React.useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      localStorage.setItem(LANGS_STORAGE_KEY, JSON.stringify({ source, target }));
    } catch {
      // localStorage недоступен (private mode) — не критично
    }
  }, [source, target]);

  // Автовысота textarea: растёт вместе с текстом, ручной resize тоже доступен
  React.useEffect(() => {
    const el = sourceRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  const translateNow = React.useCallback(
    async (opts?: { force?: boolean }) => {
      const trimmed = text.trim();
      if (!trimmed || limitReached) return;
      const key = `${source}|${target}|${trimmed}`;
      if (!opts?.force && key === lastKeyRef.current) return; // текст и пара не менялись
      lastKeyRef.current = key;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: trimmed, source, target }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (controller.signal.aborted) return;
        if (!res.ok) {
          if (data.limitReached) {
            setLimitReached(true);
            reachGoal("translate_limit");
          } else {
            setError(data.error || "Ошибка перевода");
          }
          setResult("");
          setMode(null);
        } else {
          setResult(data.translation);
          setMode(data.mode);
          setRating(null);
          reachGoal("translate_done");
        }
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
        lastKeyRef.current = ""; // даём повторить тот же текст после сбоя
        setError("Нет соединения с сервером. Попробуйте ещё раз.");
      } finally {
        if (abortRef.current === controller) setLoading(false);
      }
    },
    [text, source, target, limitReached]
  );

  // Автоперевод при паузе в наборе (дебаунс)
  React.useEffect(() => {
    const trimmed = text.trim();
    if (trimmed.length < MIN_CHARS_AUTO || limitReached) return;
    if (`${source}|${target}|${trimmed}` === lastKeyRef.current) return;
    const timer = window.setTimeout(() => {
      void translateNow();
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [text, source, target, limitReached, translateNow]);

  // Отменяем незавершённый запрос при размонтировании
  React.useEffect(() => {
    return () => {
      abortRef.current?.abort();
      window.clearTimeout(copiedTimerRef.current);
    };
  }, []);

  function swap() {
    if (source === AUTO) return; // язык ещё не определён — менять нечего
    setSource(target);
    setTarget(source);
    if (result && !error) {
      setText(result);
      setResult("");
      setMode(null);
      setRating(null);
    }
    reachGoal("swap_langs");
  }

  function clearSource() {
    abortRef.current?.abort();
    lastKeyRef.current = "";
    setText("");
    setResult("");
    setMode(null);
    setError(null);
    setRating(null);
    setLoading(false);
    sourceRef.current?.focus();
  }

  async function copyResult() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard недоступен (http/permissions) — молча пропускаем
    }
  }

  function rate(value: "up" | "down") {
    if (rating) return; // одна оценка на перевод
    setRating(value);
    reachGoal(value === "up" ? "translate_like" : "translate_dislike");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      void translateNow({ force: true });
    }
  }

  async function handleFiles(files: FileList) {
    const file = files[0];
    setFileName(file.name);
    setQuote(null);
    setDocError(null);
    setDocState("loading");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("source", source === AUTO ? "ru" : source);
      formData.append("target", target);

      const res = await fetch("/api/quote", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setDocError(data.error || "Не удалось оценить документ");
        setDocState("error");
        return;
      }

      setQuote({
        words: data.words.toLocaleString("ru-RU"),
        price: `${data.priceRub.toLocaleString("ru-RU")} ₽`,
        eta: `${data.etaDays} ${data.etaDays === 1 ? "день" : data.etaDays < 5 ? "дня" : "дней"}`,
        note: data.note,
      });
      setDocState("done");
      reachGoal("quote_done");
      onQuoteCreated?.(data.orderId);
    } catch {
      setDocError("Нет соединения с сервером. Попробуйте ещё раз.");
      setDocState("error");
    }
  }

  const ratio = Math.min(text.length / MAX_CHARS, 1);
  const nearLimit = ratio >= UPSELL_AT;

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
                  <option value={AUTO}>Определить язык</option>
                  {LANGS.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
                <div className="tp-translator__pane-tools">
                  <span className={`tp-translator__count ${nearLimit ? "tp-translator__count--warn" : ""}`}>
                    {text.length}/{MAX_CHARS}
                  </span>
                  <span className="tp-translator__meter" aria-hidden="true">
                    <span className="tp-translator__meter-fill" style={{ width: `${ratio * 100}%` }} />
                  </span>
                  {text ? (
                    <button
                      type="button"
                      className="tp-translator__action"
                      onClick={clearSource}
                      aria-label="Очистить текст"
                      title="Очистить"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  ) : null}
                </div>
              </div>
              <textarea
                ref={sourceRef}
                className="tp-translator__text"
                placeholder="Вставьте технический текст — до 2 000 знаков бесплатно…"
                value={text}
                maxLength={MAX_CHARS}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <button
              type="button"
              className="tp-translator__swap"
              onClick={swap}
              disabled={source === AUTO}
              aria-label="Поменять языки местами"
              title={source === AUTO ? "Выберите язык оригинала, чтобы поменять местами" : "Поменять языки местами"}
            >
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
                <div className="tp-translator__pane-tools">
                  {mode === "demo" ? <span className="tp-translator__demo-badge">демо-режим</span> : null}
                  {result && !loading ? (
                    <>
                      <button
                        type="button"
                        className={`tp-translator__rate ${rating === "up" ? "tp-translator__rate--active" : ""}`}
                        onClick={() => rate("up")}
                        disabled={rating !== null}
                        aria-label="Хороший перевод"
                        title="Хороший перевод"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 10v12" />
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className={`tp-translator__rate ${rating === "down" ? "tp-translator__rate--active" : ""}`}
                        onClick={() => rate("down")}
                        disabled={rating !== null}
                        aria-label="Плохой перевод"
                        title="Плохой перевод"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 14V2" />
                          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="tp-translator__action"
                        onClick={copyResult}
                        aria-label="Скопировать перевод"
                        title="Скопировать"
                      >
                        {copied ? (
                          <span className="tp-translator__copied">Скопировано</span>
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        )}
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
              <div className={`tp-translator__output ${result ? "" : "tp-translator__output--empty"}`}>
                {loading ? "Переводим…" : result || "Перевод появится здесь"}
              </div>
            </div>
          </div>

          {nearLimit ? (
            <div className="tp-translator__upsell">
              Нужно больше? <Link href="/app">В кабинете — 10 000 слов в месяц бесплатно</Link>
            </div>
          ) : null}

          {limitReached ? (
            <div className="tp-translator__limit">
              Дневной лимит бесплатных переводов на сегодня исчерпан. <Link href="/app">Зарегистрируйтесь в кабинете</Link> — там
              10 000 слов в месяц бесплатно, плюс перевод документов с сохранением вёрстки.
            </div>
          ) : null}

          {error ? <div className="tp-translator__error">{error}</div> : null}

          <div className="tp-translator__foot">
            <Button
              variant="primary"
              size="lg"
              onClick={() => void translateNow({ force: true })}
              disabled={loading || !text.trim() || limitReached}
            >
              {loading ? "Переводим…" : "Перевести"}
            </Button>
            <span className="tp-translator__note">
              {limitReached ? (
                <>
                  Лимит исчерпан — <Link href="/tarify">смотрите тарифы</Link>
                </>
              ) : (
                <>
                  Переводим автоматически при паузе в наборе (или Ctrl+Enter). Больше объёмы и AI-оркестрация —{" "}
                  <Link href="/tarify">в подписке</Link>
                </>
              )}
            </span>
          </div>
        </>
      ) : (
        <>
          <FileDropzone
            accept=".docx,.doc,.pdf,.xlsx,.xls,.csv,.txt,.md,.dwg,.dxf"
            hint="DOCX, PDF, XLSX, TXT, DWG/DXF — до 10 МБ"
            state={docState === "loading" ? "idle" : docState === "error" ? "error" : fileName ? "done" : "idle"}
            fileName={fileName ?? undefined}
            onFiles={handleFiles}
          />
          {docState === "loading" ? (
            <Card variant="glass" padding="sm">
              <div className="tp-hero__estimate-row">
                <span className="tp-translator__note">Считаем слова и сегменты…</span>
              </div>
            </Card>
          ) : null}
          {docError ? <div className="tp-translator__error">{docError}</div> : null}
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
              {quote.note ? <p className="tp-translator__note" style={{ marginTop: 8 }}>{quote.note}</p> : null}
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
