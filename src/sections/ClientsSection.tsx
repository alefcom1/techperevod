import React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { CASES } from "@/data/cases";

/**
 * Компактная trust-bar на главной — реальные клиенты (см. src/data/cases.ts),
 * ведёт на подробные кейсы /keysy. Без логотипов-картинок (нет проверенных
 * файлов), только текстовые wordmark-чипы.
 */
export function ClientsSection() {
  return (
    <section className="tp-section" id="clients">
      <div className="tp-section__inner">
        <SectionHeader
          title="Нам доверяют годами"
          subtitle="Компании, которые работают с нами от 10 до 25 лет подряд."
        />
        <div className="tp-clients-strip">
          {CASES.map((c) => (
            <Link key={c.slug} href={`/keysy#${c.slug}`} className="tp-client-chip">
              {c.name}
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href="/keysy" className="tp-clients-cta">
            Читать истории сотрудничества →
          </Link>
        </div>
      </div>
    </section>
  );
}
