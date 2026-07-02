/* BeforeAfterSection — section 4 */
const { Card } = window.TechperevodDesignSystem_4028dd;

function BeforeAfterSection() {
  return (
    <section className="tp-section" id="before-after">
      <div className="tp-section__inner">
        <div className="tp-section-header-wrap">
          <h2 className="tp-section-header__title" style={{ textAlign: "center" }}>Разница видна</h2>
        </div>
        <div className="tp-before-after">
          <Card padding="lg" className="tp-before-after__panel">
            <div className="tp-before-after__label tp-before-after__label--before">Сырой машинный перевод</div>
            <p className="tp-before-after__text">
              Установите клапан в закрытое положение до запуска насоса, для избежания
              повреждение оборудование из-за гидравлический удар в трубопровод.
            </p>
          </Card>
          <Card padding="lg" variant="elevated" className="tp-before-after__panel tp-before-after__panel--after">
            <div className="tp-before-after__label tp-before-after__label--after">Финал инженера-редактора</div>
            <p className="tp-before-after__text">
              Перед запуском насоса переведите клапан в положение «закрыто» — это предотвратит
              повреждение оборудования из-за гидравлического удара в трубопроводе.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

window.BeforeAfterSection = BeforeAfterSection;
