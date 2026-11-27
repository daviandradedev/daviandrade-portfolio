import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/skip-link";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Davi Andrade Portfolio",
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  keywords: SITE_KEYWORDS,
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Davi Andrade Portfolio",
    locale: "en_US",
    alternateLocale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/media/profile.png",
        width: 1024,
        height: 1024,
        alt: "Davi Andrade portrait",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/media/profile.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('portfolio_theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(d?'dark':'light');}catch(e){}})();`;

const personJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_AUTHOR,
  url: SITE_URL,
  image: `${SITE_URL}/media/profile.png`,
  jobTitle: "Full-Stack Software Engineer",
  sameAs: [
    "https://github.com/daviandradedev",
    "https://linkedin.com/in/daviandradedev",
    "http://lattes.cnpq.br/7450050413231065",
  ],
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "Web Accessibility",
    "Human-Computer Interaction",
    "Educational Technology",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd }} />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="app-shell">
            <SkipLink />
            {children}
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
