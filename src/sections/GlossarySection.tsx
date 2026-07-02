import React from "react";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { ProductWindow } from "@/components/marketing/ProductWindow";
import { Input } from "@/components/forms/Input";

const ROWS = [
  { ru: "привод", en: "actuator", uses: 24 },
  { ru: "клапан обратный", en: "check valve", uses: 17 },
  { ru: "гидравлический удар", en: "hydraulic shock", uses: 9 },
];

export function GlossarySection() {
  return (
    <section className="tp-section" id="glossary">
      <div className="tp-section__inner">
        <SectionHeader
          align="left"
          title="Ваша терминология под контролем"
          subtitle="Глоссарий и память переводов на каждого клиента. Повторы считаются автоматически — скидка видна до оплаты."
        />
        <ProductWindow url="app.techperevod.com/glossary">
          <div className="tp-glossary__toolbar">
            <Input placeholder="Поиск термина…" mono />
            <span className="tp-glossary__savings">Повторы: 18% · Скидка по TM: −12 400 ₽</span>
          </div>
          <table className="tp-glossary__table">
            <thead>
              <tr>
                <th>Термин (RU)</th>
                <th>Перевод (EN)</th>
                <th>Повторов</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.ru}>
                  <td className="tp-mono">{r.ru}</td>
                  <td className="tp-mono">{r.en}</td>
                  <td>{r.uses}</td>
                </tr>
              ))}
              <tr className="tp-glossary__more">
                <td colSpan={3}>+ 214 терминов в базе клиента</td>
              </tr>
            </tbody>
          </table>
        </ProductWindow>
      </div>
    </section>
  );
}
