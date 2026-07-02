/* FormatsSection — section 9 */
const { SectionHeader, FormatChip } = window.TechperevodDesignSystem_4028dd;

const FORMATS = ["DOCX", "PDF", "XLIFF", "JSON", "YAML", "DWG", "XLSX", "PO"];

function FormatsSection() {
  return (
    <section className="tp-section tp-section--tint" id="formats">
      <div className="tp-section__inner">
        <SectionHeader title="65+ форматов, включая инженерные" />
        <div className="tp-format-strip">
          {FORMATS.map((f) => (
            <FormatChip key={f}>{f}</FormatChip>
          ))}
        </div>
      </div>
    </section>
  );
}

window.FormatsSection = FormatsSection;
