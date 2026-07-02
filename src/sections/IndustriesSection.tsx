import React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { IndustryCard } from "@/components/marketing/IndustryCard";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import { INDUSTRIES } from "@/data/site";

export function IndustriesSection() {
  return (
    <section className="tp-section tp-section--tint" id="industries">
      <div className="tp-section__inner">
        <ScrollReveal>
          <SectionHeader title="Специализация по отраслям" />
        </ScrollReveal>
        <div className="tp-industry-grid">
          {INDUSTRIES.map((ind, i) => (
            <ScrollReveal key={ind.slug} delay={i * 70}>
              <Link href={`/otrasli/${ind.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <IndustryCard icon={<Icon name={ind.iconName} color="var(--tp-primary)" />} name={ind.name} />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
