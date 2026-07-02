import React from "react";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { FormatChip } from "@/components/marketing/FormatChip";

const FORMATS = ["DOCX", "PDF", "XLIFF", "JSON", "YAML", "DWG", "XLSX", "PO"];

export function FormatsSection() {
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
