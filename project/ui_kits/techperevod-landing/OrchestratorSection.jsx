/* OrchestratorSection — section 3, the key differentiator. Visual sits on
   the left here (Hero puts its visual on the right) so the two sections
   don't read as the same template repeated. */
const { SectionHeader, ProductWindow, Badge } = window.TechperevodDesignSystem_4028dd;

function OrchestratorSection() {
  return (
    <section className="tp-section tp-section--tint" id="orchestrator">
      <div className="tp-section__inner tp-orchestrator-layout">
        <div className="tp-orchestrator-layout__diagram" style={{ order: 1 }}>
          <ProductWindow url="app.techperevod.com/router">
            <div className="tp-routing-row">
              <span className="tp-routing-row__doc">patent-claims.pdf · RU→EN</span>
              <Badge tone="primary" size="sm">GPT</Badge>
              <span className="tp-routing-row__reason">юридическая точность формулировок</span>
            </div>
            <div className="tp-routing-row">
              <span className="tp-routing-row__doc">pump-manual.docx · RU→DE</span>
              <Badge tone="primary" size="sm">DeepL</Badge>
              <span className="tp-routing-row__reason">лучшее качество перевода для DE</span>
            </div>
            <div className="tp-routing-row">
              <span className="tp-routing-row__doc">tech-drawing.dwg · RU→ZH</span>
              <Badge tone="accent" size="sm">YandexGPT</Badge>
              <span className="tp-routing-row__reason">локальная модель — дешевле для ZH</span>
            </div>
            <div className="tp-routing-row">
              <span className="tp-routing-row__doc">spec-sheet.xlsx · RU→EN</span>
              <Badge tone="accent" size="sm">DeepSeek</Badge>
              <span className="tp-routing-row__reason">длинные таблицы, низкая цена</span>
            </div>
          </ProductWindow>
        </div>
        <div className="tp-orchestrator-layout__copy" style={{ order: 2 }}>
          <SectionHeader
            align="left"
            title="Единственная платформа с доступом к обоим контурам моделей"
            subtitle="GPT, Claude, DeepL и YandexGPT, DeepSeek — легально в одном рабочем процессе. Роутер выбирает модель под языковую пару и тип документа, и показывает, почему выбрал именно её."
          />
          <div className="tp-legend">
            <span className="tp-legend__item"><span className="tp-legend__dot tp-legend__dot--western" />Западные модели</span>
            <span className="tp-legend__item"><span className="tp-legend__dot tp-legend__dot--local" />Локальные модели</span>
          </div>
          <p className="tp-orchestrator-layout__caption">
            Термбаза подставляется в момент перевода — терминология едина во всех заказах
          </p>
        </div>
      </div>
    </section>
  );
}

window.OrchestratorSection = OrchestratorSection;
