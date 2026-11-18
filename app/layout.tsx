import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Davi Andrade Portfolio",
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  keywords: SITE_KEYWORDS,
  icons: {
    icon: "/icon.svg",
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

const themeInitScript = `(function(){try{var t=localStorage.getItem('portfolio_theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(d?'dark':'light');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
