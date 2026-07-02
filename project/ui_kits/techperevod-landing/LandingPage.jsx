/* LandingPage — assembles NavBar + all sections + Footer */
const { NavBar, Footer, ThemeToggle, Button, BrandMark } = window.TechperevodDesignSystem_4028dd;

function LandingPage() {
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem("tp-landing-theme") || "light"
  );

  React.useEffect(() => {
    document.documentElement.setAttribute("data-tp-theme", theme);
    localStorage.setItem("tp-landing-theme", theme);
  }, [theme]);

  return (
    <div className="tp-landing">
      <NavBar
        logo={
          <a href="index.html" style={{ display: "flex" }}>
            <BrandMark theme={theme} basePath="../../" height={48} tagline={false} />
          </a>
        }
        links={[
          { label: "Как это работает", href: "#how" },
          { label: "AI-оркестратор", href: "#orchestrator" },
          { label: "Тарифы", href: "#pricing" },
          { label: "Отрасли", href: "#industries" },
          { label: "Блог", href: "pages/blog.html" },
        ]}
        right={<ThemeToggle theme={theme} onChange={setTheme} />}
        cta={
          <Button size="sm" variant="primary" as="a" href="#hero">
            Загрузить документ
          </Button>
        }
      />

      <HeroSection />
      <HowItWorksSection />
      <OrchestratorSection />
      <BeforeAfterSection />
      <PricingSection />
      <GlossarySection />
      <IndustriesSection />
      <B2BSection />
      <FormatsSection />
      <ProofSection />

      <Footer
        logo={<BrandMark theme={theme} basePath="../../" height={68} />}
        columns={[
          {
            title: "Услуги",
            links: [
              { label: "Full", href: "#pricing" },
              { label: "MTPE", href: "#pricing" },
              { label: "Express", href: "#pricing" },
            ],
          },
          {
            title: "Отрасли",
            links: [
              { label: "IT и SaaS", href: "pages/industry-it-saas.html" },
              { label: "Нефтегаз и энергетика", href: "pages/industry-oil-gas.html" },
              { label: "Машиностроение", href: "pages/industry-machinery.html" },
              { label: "Медтех и фарма", href: "pages/industry-medtech.html" },
            ],
          },
          {
            title: "Платформа",
            links: [
              { label: "AI-оркестратор", href: "#orchestrator" },
              { label: "Термбаза и TM", href: "#glossary" },
              { label: "Форматы", href: "#formats" },
            ],
          },
          {
            title: "Компания",
            links: [
              { label: "О нас", href: "pages/about.html" },
              { label: "Блог", href: "pages/blog.html" },
              { label: "Контакты", href: "pages/contacts.html" },
            ],
          },
        ]}
        bottom={<span>© 2026 techperevod.com</span>}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LandingPage />);
