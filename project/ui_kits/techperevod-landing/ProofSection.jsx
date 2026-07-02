/* ProofSection — section 10. Illustrative metrics (see readme.md caveats)
   plus real-feeling social proof: a sample customer quote and a client
   logo wall — both explicitly flagged as placeholders until real
   figures/customers replace them. */
const { SectionHeader, StatMetric, LogoStrip, Testimonial } = window.TechperevodDesignSystem_4028dd;

function ProofSection() {
  return (
    <section className="tp-section" id="proof">
      <div className="tp-section__inner">
        <div className="tp-proof-layout">
          <div className="tp-proof-layout__stats">
            <SectionHeader
              align="left"
              title="Не только слова — конкретные цифры"
              subtitle="Иллюстративные показатели пилота; обновим на реальные данные по итогам первого отчётного периода."
            />
            <div className="tp-proof-row tp-proof-row--left">
              <StatMetric value="40 млн+" label="слов переведено" />
              <StatMetric value="35%" label="экономии по TM" />
              <StatMetric value="2 мин" label="среднее время оценки" />
            </div>
          </div>
          <Testimonial
            quote="Отправляем чертежи вечером — утром уже виден перевод с сохранённой разметкой таблиц, редактору остаётся только сверить термины."
            name="Роман Соколов"
            role="Руководитель проектов"
            company="промышленный холдинг"
            sample
          />
        </div>
        <LogoStrip
          caption="Пилотные клиенты платформы (иллюстративные названия — заменить реальными)"
          logos={["ПРОММАШ", "НЕФТЕСЕРВИС", "МЕДТЕХГРУПП", "ИТ-ВЕКТОР", "ГАЗТЕХНО"]}
        />
      </div>
    </section>
  );
}

window.ProofSection = ProofSection;
