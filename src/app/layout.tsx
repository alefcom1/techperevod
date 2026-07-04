import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { YandexMetrika } from "@/components/analytics/YandexMetrika";
import { SITE_EMAIL, SITE_INN, SITE_LEGAL_NAME, SITE_PHONE_TEL, SITE_TELEGRAM_URL } from "@/data/site";

const SITE_URL = "https://techperevod.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Техперевод.com",
  legalName: SITE_LEGAL_NAME,
  taxID: SITE_INN,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/favicon-192.png`,
  email: SITE_EMAIL,
  telephone: SITE_PHONE_TEL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Глинищевский пер., д. 6, оф. 2",
    addressLocality: "Москва",
    postalCode: "125009",
    addressCountry: "RU",
  },
  sameAs: [SITE_TELEGRAM_URL],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE_PHONE_TEL,
    email: SITE_EMAIL,
    contactType: "customer service",
    areaServed: "RU",
    availableLanguage: ["Russian", "English"],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Техперевод.com — технический перевод AI + инженер",
    template: "%s | Техперевод.com",
  },
  description:
    "Технический перевод для инженерных, IT и промышленных компаний: связка AI-моделей и редактора-инженера. Оценка объёма и срока за 2 минуты после загрузки документа.",
  keywords: [
    "технический перевод",
    "перевод документации",
    "AI перевод",
    "перевод нефтегаз",
    "перевод машиностроение",
    "перевод медтех",
    "локализация SaaS",
    "MTPE",
    "термбаза",
    "память переводов",
  ],
  authors: [{ name: "Техперевод.com" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Техперевод.com",
    title: "Техперевод.com — технический перевод AI + инженер",
    description:
      "Связка AI-моделей и инженера-редактора для технического перевода. Оценка за 2 минуты, 65+ форматов, специализация по отраслям.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Техперевод.com — технический перевод AI + инженер",
    description:
      "Связка AI-моделей и инженера-редактора для технического перевода. Оценка за 2 минуты, 65+ форматов.",
  },
  icons: {
    icon: [
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
};

// Applies the stored theme to <html> before first paint to avoid a flash of
// the wrong theme. Kept tiny and dependency-free.
const themeInitScript = `try{var t=localStorage.getItem('tp-landing-theme')||'light';document.documentElement.setAttribute('data-tp-theme',t);}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-tp-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <YandexMetrika />
        {/* #root keeps content above the fixed film-grain overlay (landing.css) */}
        <div id="root">
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>
    </html>
  );
}
