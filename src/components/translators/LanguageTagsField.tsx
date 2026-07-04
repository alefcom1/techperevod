"use client";

import React from "react";
import { Modal } from "@/components/core/Modal";
import { Button } from "@/components/core/Button";
import { LANGUAGE_OPTIONS, LEVELS } from "@/data/translators";

export interface LanguageEntry {
  name: string;
  level: string;
}

export interface LanguageScore {
  score: number;
  feedback: string;
  date: string;
}

export interface LanguageTagsFieldProps {
  languages: LanguageEntry[];
  scores: Record<string, LanguageScore>;
  onChange: (languages: LanguageEntry[]) => void;
  onStartTest: (lang: string) => void;
}

/** Языковые теги анкеты: добавление пары язык+уровень, правка уровня, запуск AI-теста. */
export function LanguageTagsField({ languages, scores, onChange, onStartTest }: LanguageTagsFieldProps) {
  const [selLang, setSelLang] = React.useState("");
  const [selLevel, setSelLevel] = React.useState("B2");
  const [editingLang, setEditingLang] = React.useState<string | null>(null);
  const [editLevel, setEditLevel] = React.useState("B2");

  const available = LANGUAGE_OPTIONS.filter((l) => !languages.some((x) => x.name === l));

  function addLang() {
    if (!selLang) return;
    onChange([...languages, { name: selLang, level: selLevel }]);
    setSelLang("");
  }

  function removeLang(name: string) {
    onChange(languages.filter((l) => l.name !== name));
  }

  function openEdit(name: string, currentLevel: string) {
    setEditingLang(name);
    setEditLevel(currentLevel);
  }

  function saveEdit() {
    if (!editingLang) return;
    onChange(languages.map((l) => (l.name === editingLang ? { ...l, level: editLevel } : l)));
    setEditingLang(null);
  }

  return (
    <div className="tp-langfield">
      <div className="tp-langfield__add">
        <select className="tp-input tp-select" value={selLang} onChange={(e) => setSelLang(e.target.value)}>
          <option value="">Выберите язык…</option>
          {available.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select className="tp-input tp-select" value={selLevel} onChange={(e) => setSelLevel(e.target.value)}>
          {LEVELS.map((lv) => (
            <option key={lv.value} value={lv.value}>
              {lv.label} — {lv.desc}
            </option>
          ))}
        </select>
        <Button type="button" variant="secondary" size="md" onClick={addLang} disabled={!selLang}>
          Добавить
        </Button>
      </div>

      {languages.length ? (
        <div className="tp-langfield__tags">
          {languages.map((l) => {
            const sc = scores[l.name];
            return (
              <span className="tp-langtag" key={l.name}>
                <span className="tp-langtag__name" onClick={() => openEdit(l.name, l.level)}>
                  {l.name}
                </span>
                <span className="tp-langtag__level" onClick={() => openEdit(l.name, l.level)}>
                  {l.level}
                </span>
                {sc ? (
                  <span className="tp-langtag__score">★ {sc.score}/100</span>
                ) : (
                  <button type="button" className="tp-langtag__test" onClick={() => onStartTest(l.name)}>
                    → Тест
                  </button>
                )}
                <button type="button" className="tp-langtag__remove" onClick={() => removeLang(l.name)} aria-label={`Убрать ${l.name}`}>
                  ✕
                </button>
              </span>
            );
          })}
        </div>
      ) : null}

      {editingLang ? (
        <Modal
          onClose={() => setEditingLang(null)}
          title={`Уровень: ${editingLang}`}
          subtitle="Выберите актуальный уровень"
          maxWidth={420}
          footer={
            <>
              <Button type="button" variant="secondary" onClick={() => setEditingLang(null)}>
                Отмена
              </Button>
              <Button type="button" variant="primary" onClick={saveEdit}>
                Сохранить
              </Button>
            </>
          }
        >
          <div className="tp-levelgrid">
            {LEVELS.map((lv) => (
              <label key={lv.value} className={["tp-levelopt", editLevel === lv.value ? "tp-levelopt--sel" : ""].join(" ")}>
                <input type="radio" name="elvl" value={lv.value} checked={editLevel === lv.value} onChange={() => setEditLevel(lv.value)} />
                <span>
                  <b>{lv.label}</b> — {lv.desc}
                </span>
              </label>
            ))}
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
