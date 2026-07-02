"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { Translator } from "@/components/translator/Translator";
import { reachGoal } from "@/lib/metrika";

export interface TranslatorSectionProps {
  title?: string;
  subtitle?: string;
}

/**
 * Полноширинный блок переводчика сразу под hero (уровень Free воронки):
 * заголовок, большой Translator и узкая CTA-карточка «перетащите документ» —
 * клик или drop файла ведут на /kontakty. Имя брошенного файла кладём в
 * sessionStorage ("tp-doc-filename"), чтобы страница контактов могла
 * подставить его в форму.
 */
export function TranslatorSection({
  title = "Попробуйте технический перевод прямо сейчас",
  subtitle = "Бесплатно и без регистрации — до 2 000 знаков. Терминология, числа и единицы измерения сохраняются.",
}: TranslatorSectionProps) {
  const router = useRouter();
  const [dragOver, setDragOver] = React.useState(false);

  function goToContacts(droppedFileName?: string) {
    if (droppedFileName) {
      try {
        sessionStorage.setItem("tp-doc-filename", droppedFileName);
      } catch {
        // sessionStorage недоступен — переходим без предзаполнения
      }
    }
    reachGoal("doc_cta");
    router.push("/kontakty");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    goToContacts(file ? file.name : undefined);
  }

  return (
    <section className="tp-section" id="translate">
      <div className="tp-section__inner">
        <ScrollReveal>
          <SectionHeader title={title} subtitle={subtitle} />
        </ScrollReveal>
        <ScrollReveal delay={70}>
          <Translator />
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <div
            className={`tp-drop-cta ${dragOver ? "tp-drop-cta--over" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => goToContacts()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goToContacts();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <span className="tp-drop-cta__icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
                <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
            </span>
            <span className="tp-drop-cta__text">
              Перетащите сюда документ — <strong>оценим объём и срок за 2 минуты</strong>
            </span>
            <span className="tp-drop-cta__arrow" aria-hidden="true">→</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
