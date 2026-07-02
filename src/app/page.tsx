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

export default function HomePage() {
  return (
    <SiteShell>
      <HeroSection />
      <ComparisonSection />
      <HowItWorksSection />
      <OrchestratorSection />
      <WhySection />
      <BeforeAfterSection />
      <PricingSection />
      <GlossarySection />
      <AudienceSection />
      <FormatsSection />
      <ProofSection />
    </SiteShell>
  );
}
