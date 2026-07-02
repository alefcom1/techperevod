import { SiteShell } from "@/components/layout/SiteShell";
import { HeroSection } from "@/sections/HeroSection";
import { ComparisonSection } from "@/sections/ComparisonSection";
import { HowItWorksSection } from "@/sections/HowItWorksSection";
import { OrchestratorSection } from "@/sections/OrchestratorSection";
import { AiSuiteSection } from "@/sections/AiSuiteSection";
import { BeforeAfterSection } from "@/sections/BeforeAfterSection";
import { PricingSection } from "@/sections/PricingSection";
import { GlossarySection } from "@/sections/GlossarySection";
import { IndustriesSection } from "@/sections/IndustriesSection";
import { B2BSection } from "@/sections/B2BSection";
import { FormatsSection } from "@/sections/FormatsSection";
import { ProofSection } from "@/sections/ProofSection";

export default function HomePage() {
  return (
    <SiteShell>
      <HeroSection />
      <ComparisonSection />
      <HowItWorksSection />
      <OrchestratorSection />
      <AiSuiteSection />
      <BeforeAfterSection />
      <PricingSection />
      <GlossarySection />
      <IndustriesSection />
      <B2BSection />
      <FormatsSection />
      <ProofSection />
    </SiteShell>
  );
}
