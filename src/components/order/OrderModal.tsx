"use client";

import React from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { LANG_NAMES, capitalize } from "@/data/langs";

/**
 * Всплывающая многошаговая форма заказа перевода. Открывается с любой
 * CTA-кнопки сайта: ссылки с href="#zakaz" перехватываются глобальным
 * слушателем (см. OrderModalHost в SiteShell), либо программно через
 * window.dispatchEvent(new CustomEvent("tp:order")).
 *
 * Шаги: 1) документы + языки → мгновенная оценка через /api/quote;
 *       2) срок готовности (Стандарт/Срочно/Экспресс);
 *       3) контакты → POST /api/leads (email + Telegram + TMS на сервере).
 * Файл не обязателен: без документа форма работает как быстрая заявка.
 */

interface QuotedFile {
  file: File;
  status: "pending" | "done" | "error";
  words?: number;
  priceRub?: number;
  etaDays?: number;
  repeatPct?: number;
  error?: string;
}

type Urgency = "standard" | "urgent" | "express";

const URGENCY_OPTIONS: { key: Urgency; label: string; multiplier: number; etaFactor: number; note: string }[] = [
  { key: "standard", label: "Стандарт", multiplier: 1, etaFactor: 1, note: "без доплаты" },
  { key: "urgent", label: "Срочно", multiplier: 1.5, etaFactor: 0.6, note: "цена ×1.5" },
  { key: "express", label: "Экспресс", multiplier: 2, etaFactor: 0.4, note: "цена ×2" },
];

const ACCEPT = ".pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.csv,.dwg,.dxf,.idml,.html,.md";

function fmtRub(n: number): string {
  return n.toLocaleString("ru-RU");
}

export function OrderModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [files, setFiles] = React.useState<QuotedFile[]>([]);
  const [source, setSource] = React.useState("ru");
  const [target, setTarget] = React.useState("en");
  const [urgency, setUrgency] = React.useState<Urgency>("standard");
  const [dragOver, setDragOver] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const filesRef = React.useRef<File[]>([]);

  // Сброс состояния при каждом новом открытии
  React.useEffect(() => {
    if (open) {
      setStep(1);
      setFiles([]);
      filesRef.current = [];
      setUrgency("standard");
      setSent(false);
      setError(null);
    }
  }, [open]);

  // Закрытие по Escape + блокировка прокрутки фона
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const quoteFile = React.useCallback(
    async (file: File) => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("source", source);
      fd.append("target", target);
      try {
        const res = await fetch("/api/quote", { method: "POST", body: fd });
        const data = await res.json();
        setFiles((prev) =>
          prev.map((f) =>
            f.file === file
              ? res.ok
                ? { ...f, status: "done", words: data.words, priceRub: data.priceRub, etaDays: data.etaDays, repeatPct: data.repeatPct }
                : { ...f, status: "error", error: data.error || "Не удалось оценить автоматически" }
              : f
          )
        );
      } catch {
        setFiles((prev) => prev.map((f) => (f.file === file ? { ...f, status: "error", error: "Нет соединения" } : f)));
      }
    },
    [source, target]
  );

  const addFiles = React.useCallback(
    (list: FileList | File[]) => {
      const incoming = Array.from(list).filter((f) => f.size > 0 && !filesRef.current.some((e) => e.name === f.name && e.size === f.size));
      if (!incoming.length) return;
      filesRef.current = [...filesRef.current, ...incoming];
      setFiles((prev) => [...prev, ...incoming.map<QuotedFile>((file) => ({ file, status: "pending" }))]);
      incoming.forEach((f) => void quoteFile(f));
    },
    [quoteFile]
  );

  function removeFile(target: File) {
    filesRef.current = filesRef.current.filter((f) => f !== target);
    setFiles((prev) => prev.filter((f) => f.file !== target));
  }

  const quoted = files.filter((f) => f.status === "done");
  const baseTotal = quoted.reduce((acc, f) => acc + (f.priceRub ?? 0), 0);
  const baseEta = quoted.reduce((acc, f) => Math.max(acc, f.etaDays ?? 0), 0);
  const opt = URGENCY_OPTIONS.find((o) => o.key === urgency)!;
  const total = Math.round(baseTotal * opt.multiplier);
  const eta = Math.max(1, Math.ceil(baseEta * opt.etaFactor));
  const hasUnparsed = files.some((f) => f.status === "error");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      fd.append("langPair", `${capitalize(LANG_NAMES[source] ?? source)} → ${capitalize(LANG_NAMES[target] ?? target)}`);
      // Коды языков отдельно от отображаемой строки — нужны TMS для
      // language_pair в формате каталога (напр. "en-ru").
      fd.append("sourceLangCode", source);
      fd.append("targetLangCode", target);
      fd.append("urgency", urgency);
      if (baseTotal > 0) {
        fd.append("totalRub", String(total));
        fd.append("etaDays", String(eta));
      }
      filesRef.current.forEach((f) => fd.append("files", f));
      const res = await fetch("/api/leads", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Не удалось отправить заявку");
        return;
      }
      setSent(true);
    } catch {
      setError("Нет соединения с сервером. Попробуйте ещё раз или напишите нам напрямую.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="tp-order__overlay" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label="Заказ перевода">
      <div className="tp-order">
        <button type="button" className="tp-order__close" onClick={onClose} aria-label="Закрыть">
          <Icon name="x" size={20} />
        </button>

        {sent ? (
          <div className="tp-order__done">
            <div className="tp-order__done-icon">
              <Icon name="check" size={28} />
            </div>
            <h3 className="tp-order__title">Заявка отправлена</h3>
            <p className="tp-order__muted">
              Мы получили ваш запрос{files.length ? " и документы" : ""} и ответим в течение рабочего дня — обычно быстрее.
            </p>
            <Button variant="primary" size="lg" onClick={onClose}>
              Готово
            </Button>
          </div>
        ) : (
          <>
            <div className="tp-order__steps" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span key={n} className={`tp-order__step-dot ${step >= n ? "tp-order__step-dot--active" : ""}`}>
                  {n}
                </span>
              ))}
            </div>

            {step === 1 ? (
              <div>
                <h3 className="tp-order__title">Расчёт по документу</h3>
                <p className="tp-order__muted">
                  Загрузите файлы — посчитаем объём и стоимость автоматически. Нет файла под рукой — просто{" "}
                  <button type="button" className="tp-order__linkbtn" onClick={() => setStep(3)}>
                    оставьте заявку
                  </button>
                  .
                </p>

                <div className="tp-order__langs">
                  <label>
                    Язык оригинала
                    <select value={source} onChange={(e) => setSource(e.target.value)}>
                      {Object.entries(LANG_NAMES).map(([code, name]) => (
                        <option key={code} value={code}>
                          {capitalize(name)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Язык перевода
                    <select value={target} onChange={(e) => setTarget(e.target.value)}>
                      {Object.entries(LANG_NAMES).map(([code, name]) => (
                        <option key={code} value={code}>
                          {capitalize(name)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div
                  className={`tp-order__drop ${dragOver ? "tp-order__drop--over" : ""}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    addFiles(e.dataTransfer.files);
                  }}
                >
                  <Icon name="file-text" size={28} />
                  <p>Перетащите файлы сюда или</p>
                  <Button variant="secondary" size="md" onClick={() => inputRef.current?.click()}>
                    Выбрать файлы
                  </Button>
                  <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept={ACCEPT}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files) addFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                  <span className="tp-order__formats">PDF · DOCX · XLSX · TXT · DWG · IDML и другие — до 10 МБ</span>
                </div>

                {files.length > 0 ? (
                  <ul className="tp-order__files">
                    {files.map((f) => (
                      <li key={`${f.file.name}-${f.file.size}`} className="tp-order__file">
                        <span className="tp-order__file-name">{f.file.name}</span>
                        <span className="tp-order__file-info">
                          {f.status === "pending" ? "Считаем…" : null}
                          {f.status === "done" ? `${f.words} слов · ${fmtRub(f.priceRub ?? 0)} ₽${(f.repeatPct ?? 0) > 0 ? ` · повторы −${f.repeatPct}%` : ""}` : null}
                          {f.status === "error" ? "оценит менеджер" : null}
                        </span>
                        <button type="button" className="tp-order__file-del" onClick={() => removeFile(f.file)} aria-label={`Убрать ${f.file.name}`}>
                          <Icon name="x" size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="tp-order__nav">
                  <span className="tp-order__total">{baseTotal > 0 ? `Предварительно: ${fmtRub(baseTotal)} ₽` : ""}</span>
                  <Button variant="primary" size="lg" onClick={() => setStep(2)} disabled={files.length === 0 || files.some((f) => f.status === "pending")}>
                    Далее
                  </Button>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <h3 className="tp-order__title">Срок готовности</h3>
                <p className="tp-order__muted">Стоимость пересчитывается по выбранному сроку. Точную дату подтвердим при оформлении.</p>
                <div className="tp-order__urgency">
                  {URGENCY_OPTIONS.map((o) => {
                    const d = Math.max(1, Math.ceil(baseEta * o.etaFactor));
                    return (
                      <button
                        key={o.key}
                        type="button"
                        className={`tp-order__urgency-card ${urgency === o.key ? "tp-order__urgency-card--active" : ""}`}
                        onClick={() => setUrgency(o.key)}
                      >
                        <span className="tp-order__urgency-name">{o.label}</span>
                        <span className="tp-order__urgency-eta">~{d} раб. {d === 1 ? "день" : d < 5 ? "дня" : "дней"}</span>
                        <span className="tp-order__urgency-note">{o.note}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="tp-order__summary">
                  <span>Итого по оценке</span>
                  <strong>{fmtRub(total)} ₽</strong>
                </div>
                {hasUnparsed ? <p className="tp-order__hint">Часть файлов не удалось оценить автоматически — менеджер уточнит стоимость по ним.</p> : null}
                <div className="tp-order__nav">
                  <Button variant="ghost" size="lg" onClick={() => setStep(1)}>
                    Назад
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setStep(3)}>
                    Далее
                  </Button>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <form onSubmit={submit}>
                <h3 className="tp-order__title">Куда прислать расчёт</h3>
                <p className="tp-order__muted">
                  {baseTotal > 0
                    ? `Предварительная оценка: ${fmtRub(total)} ₽, ~${eta} раб. дн. Менеджер подтвердит её и пришлёт счёт.`
                    : "Опишите задачу — ответим с оценкой в течение рабочего дня."}
                </p>
                <div className="tp-order__fields">
                  <input name="name" placeholder="Имя *" required autoComplete="name" />
                  <input name="email" type="email" placeholder="Email *" required autoComplete="email" />
                  <input name="phone" type="tel" placeholder="Телефон" autoComplete="tel" />
                  <input name="company" placeholder="Компания" autoComplete="organization" />
                  <textarea name="comment" placeholder="Комментарий к заказу" rows={3} />
                  {/* Honeypot от ботов — визуально скрыт */}
                  <input name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: -9999, opacity: 0 }} />
                </div>
                {error ? <p className="tp-order__error">{error}</p> : null}
                <div className="tp-order__nav">
                  <Button variant="ghost" size="lg" onClick={() => setStep(files.length ? 2 : 1)} type="button">
                    Назад
                  </Button>
                  <Button variant="primary" size="lg" type="submit" disabled={submitting}>
                    {submitting ? "Отправляем…" : "Отправить заявку"}
                  </Button>
                </div>
              </form>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Глобальный хост модалки: рендерится один раз в SiteShell, перехватывает
 * клики по любым ссылкам с href="#zakaz" и слушает событие "tp:order".
 */
export function OrderModalHost() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href="#zakaz"], a[href$="#zakaz"]');
      if (anchor) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onEvent = () => setOpen(true);
    document.addEventListener("click", onClick);
    window.addEventListener("tp:order", onEvent);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("tp:order", onEvent);
    };
  }, []);

  return <OrderModal open={open} onClose={() => setOpen(false)} />;
}
