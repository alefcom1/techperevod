import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { HeroSection } from "@/sections/HeroSection";
import { ComparisonSection } from "@/sections/ComparisonSection";
import { HowItWorksSection } from "@/sections/HowItWorksSection";
import { OrchestratorSection } from "@/sections/OrchestratorSection";
import { WhySection } from "@/sections/WhySection";
import { BeforeAfterSection } from "@/sections/BeforeAfterSection";
import { PricingSection } from "@/sections/PricingSection";
import { GlossarySection } from "@/sections/GlossarySection";
import { AudienceSection } from "@/sections/AudienceSection";
import { FormatsSection } from "@/sections/FormatsSection";
import { ProofSection } from "@/sections/ProofSection";
import { getContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: { absolute: content.meta.home.title },
    description: content.meta.home.description,
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const content = await getContent();
  const { home } = content;
  return (
    <SiteShell>
      <HeroSection subtitle={home.heroSubtitle} />
      <ComparisonSection title={home.comparisonTitle} subtitle={home.comparisonSubtitle} />
      <HowItWorksSection subtitle={home.howItWorksSubtitle} />
      <OrchestratorSection title={home.orchestratorTitle} subtitle={home.orchestratorSubtitle} />
      <WhySection title={home.whyTitle} subtitle={home.whySubtitle} />
      <BeforeAfterSection title={home.beforeAfterTitle} />
      <PricingSection title={home.pricingTitle} />
      <GlossarySection title={home.glossaryTitle} subtitle={home.glossarySubtitle} />
      <AudienceSection title={home.audienceTitle} subtitle={home.audienceSubtitle} />
      <FormatsSection title={home.formatsTitle} />
      <ProofSection title={home.proofTitle} subtitle={home.proofSubtitle} />
    </SiteShell>
  );
}
