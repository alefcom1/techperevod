"use client";

import React from "react";
import { Modal } from "@/components/core/Modal";
import { Button } from "@/components/core/Button";

interface Question {
  id: number;
  type: string;
  cat: string;
  q: string;
  ex: string | null;
  opts: string[] | null;
  corr: number | null;
}

export interface TranslatorTestResult {
  score: number;
  feedback: string;
  date: string;
}

type Phase = "loading" | "question" | "grading" | "result" | "error";

const OPT_LETTERS = ["А", "Б", "В", "Г"];

/** AI-тест на знание языка внутри анкеты переводчика: генерация 10 вопросов
 * (/api/translator-applications/test/generate) → ответы → проверка
 * (.../test/grade). Полный цикл живёт здесь, родитель получает только
 * итоговый результат через onComplete. */
export function TranslatorTestModal({
  lang,
  onClose,
  onComplete,
}: {
  lang: string;
  onClose: () => void;
  onComplete: (result: TranslatorTestResult) => void;
}) {
  const [phase, setPhase] = React.useState<Phase>("loading");
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [cur, setCur] = React.useState(0);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<{ score: number; feedback: string } | null>(null);

  const load = React.useCallback(() => {
    setPhase("loading");
    setError("");
    setCur(0);
    fetch("/api/translator-applications/test/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setQuestions(d.questions);
        setAnswers(new Array(d.questions.length).fill(""));
        setPhase("question");
      })
      .catch((e) => {
        setError(e.message || "Ошибка генерации теста");
        setPhase("error");
      });
  }, [lang]);

  React.useEffect(() => {
    load();
  }, [load]);

  function setAnswer(text: string) {
    setAnswers((a) => {
      const next = [...a];
      next[cur] = text;
      return next;
    });
  }

  function submitForGrading(finalAnswers: string[]) {
    setPhase("grading");
    const qa = questions.map((q, i) => ({
      type: q.type,
      q: q.q,
      ex: q.ex,
      ans: finalAnswers[i] || "",
      corr: q.type === "multiple_choice" && q.corr != null && q.opts ? q.opts[q.corr] : null,
    }));
    fetch("/api/translator-applications/test/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang, qa }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setResult({ score: d.score, feedback: d.feedback });
        setPhase("result");
      })
      .catch((e) => {
        setError(e.message || "Ошибка проверки теста");
        setPhase("error");
      });
  }

  function next() {
    if (cur < questions.length - 1) {
      setCur((c) => c + 1);
      return;
    }
    submitForGrading(answers);
  }

  function finish() {
    if (!result) return;
    onComplete({ score: result.score, feedback: result.feedback, date: new Date().toLocaleDateString("ru-RU") });
    onClose();
  }

  if (phase === "loading" || phase === "grading") {
    return (
      <Modal onClose={onClose} title={`Тест: ${lang}`} maxWidth={660}>
        <div className="tp-testload">
          <div className="tp-testload__spinner" />
          <div className="tp-testload__title">{phase === "loading" ? "Создаём вопросы…" : "Проверяем ваши ответы…"}</div>
          <div className="tp-testload__hint">
            {phase === "loading" ? "Готовим 10 заданий по вашей языковой паре" : "AI анализирует качество ответов"}
          </div>
        </div>
      </Modal>
    );
  }

  if (phase === "error") {
    return (
      <Modal
        onClose={onClose}
        title="Ошибка"
        maxWidth={520}
        footer={
          <>
            <Button type="button" variant="secondary" onClick={onClose}>
              Закрыть
            </Button>
            <Button type="button" variant="primary" onClick={load}>
              Попробовать снова
            </Button>
          </>
        }
      >
        <p style={{ color: "var(--tp-text-muted)" }}>{error}</p>
      </Modal>
    );
  }

  if (phase === "result" && result) {
    const tier = result.score >= 85 ? "ex" : result.score >= 70 ? "gd" : result.score >= 50 ? "av" : "pw";
    const label =
      result.score >= 85 ? "Отличный результат!" : result.score >= 70 ? "Хороший результат" : result.score >= 50 ? "Средний уровень" : "Есть куда расти";
    return (
      <Modal
        onClose={finish}
        maxWidth={560}
        footer={
          <>
            <Button type="button" variant="secondary" onClick={load}>
              🔁 Пересдать
            </Button>
            <Button type="button" variant="primary" onClick={finish}>
              Готово ✓
            </Button>
          </>
        }
      >
        <div className={`tp-testresult tp-testresult--${tier}`}>
          <div className="tp-testresult__score">{result.score}</div>
          <div className="tp-testresult__of">баллов из 100</div>
          <div className="tp-testresult__label">{label}</div>
          <div className="tp-testresult__bar">
            <div className="tp-testresult__bar-fill" style={{ width: `${result.score}%` }} />
          </div>
          <p className="tp-testresult__feedback">{result.feedback}</p>
        </div>
      </Modal>
    );
  }

  const q = questions[cur];
  if (!q) return null;
  const isMc = q.type === "multiple_choice" && Array.isArray(q.opts);
  const answered = Boolean(answers[cur]);
  const pct = Math.round((cur / questions.length) * 100);

  return (
    <Modal onClose={onClose} title={`Тест: ${lang}`} subtitle={`Вопрос ${cur + 1} из ${questions.length}`} maxWidth={660}>
      <div className="tp-testq__progress">
        <div className="tp-testq__progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="tp-testq__cat">{q.cat}</div>
      <div className="tp-testq__text">{q.q}</div>
      {q.ex ? <div className="tp-testq__ex">{q.ex}</div> : null}

      {isMc ? (
        <div className="tp-testq__opts">
          {q.opts!.map((o, i) => (
            <button
              key={i}
              type="button"
              className={["tp-testq__opt", answers[cur] === o ? "tp-testq__opt--sel" : ""].join(" ")}
              onClick={() => setAnswer(o)}
            >
              <span className="tp-testq__opt-letter">{OPT_LETTERS[i]}</span>
              {o}
            </button>
          ))}
        </div>
      ) : (
        <textarea
          className="tp-testq__textarea"
          placeholder="Введите ваш ответ…"
          value={answers[cur]}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      <Button type="button" variant="primary" size="lg" fullWidth disabled={!answered} onClick={next}>
        {cur < questions.length - 1 ? "Следующий →" : "Завершить ✓"}
      </Button>
    </Modal>
  );
}
