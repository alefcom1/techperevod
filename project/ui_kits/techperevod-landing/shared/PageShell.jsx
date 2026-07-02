/* PageShell — shared Nav + Footer wrapper for every secondary page.
   `root` = relative path from the page's own file to ui_kits/techperevod-landing/
            (e.g. "../" for files in pages/, "./" for index.html itself).
   `assetsRoot` = relative path from the page's own file to the project root
            (for BrandMark/logo assets + the design-system bundle). */
const { NavBar, Footer, ThemeToggle, Button, BrandMark } = window.TechperevodDesignSystem_4028dd;

function PageShell({ theme, setTheme, root = "../", assetsRoot = "../../../", children }) {
  const links = [
    { label: "Как это работает", href: root + "index.html#how" },
    { label: "AI-оркестратор", href: root + "index.html#orchestrator" },
    { label: "Тарифы", href: root + "index.html#pricing" },
    { label: "Отрасли", href: root + "index.html#industries" },
    { label: "Блог", href: root + "pages/blog.html" },
  ];

  return (
    <div className="tp-landing">
      <NavBar
        logo={
          <a href={root + "index.html"} style={{ display: "flex" }}>
            <BrandMark theme={theme} basePath={assetsRoot} height={48} tagline={false} />
          </a>
        }
        links={links}
        right={<ThemeToggle theme={theme} onChange={setTheme} />}
        cta={
          <Button size="sm" variant="primary" as="a" href={root + "index.html#hero"}>
            Загрузить документ
          </Button>
        }
      />

      {children}

      <Footer
        logo={<BrandMark theme={theme} basePath={assetsRoot} height={68} />}
        columns={[
          {
            title: "Услуги",
            links: [
              { label: "Full", href: root + "index.html#pricing" },
              { label: "MTPE", href: root + "index.html#pricing" },
              { label: "Express", href: root + "index.html#pricing" },
            ],
          },
          {
            title: "Отрасли",
            links: [
              { label: "IT и SaaS", href: root + "pages/industry-it-saas.html" },
              { label: "Нефтегаз и энергетика", href: root + "pages/industry-oil-gas.html" },
              { label: "Машиностроение", href: root + "pages/industry-machinery.html" },
              { label: "Медтех и фарма", href: root + "pages/industry-medtech.html" },
            ],
          },
          {
            title: "Платформа",
            links: [
              { label: "AI-оркестратор", href: root + "index.html#orchestrator" },
              { label: "Термбаза и TM", href: root + "index.html#glossary" },
              { label: "Форматы", href: root + "index.html#formats" },
            ],
          },
          {
            title: "Компания",
            links: [
              { label: "О нас", href: root + "pages/about.html" },
              { label: "Блог", href: root + "pages/blog.html" },
              { label: "Контакты", href: root + "pages/contacts.html" },
            ],
          },
        ]}
        bottom={<span>© 2026 techperevod.com</span>}
      />
    </div>
  );
}

window.PageShell = PageShell;
