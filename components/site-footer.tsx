"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { BrandWordmark } from "@/components/brand-wordmark";
import { useLanguage } from "@/lib/contexts/language-context";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <BrandWordmark
            className="site-footer-brand"
            title="daviandrade.dev"
            variant="daviandrade"
          />
          <p className="site-footer-copy">{t("footer.copy")}</p>
          <nav className="site-footer-links" aria-label={t("common.footerLinks")}>
            <a
              href="https://linkedin.com/in/daviandradedev"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <Linkedin size={16} aria-hidden="true" />
              <span className="sr-only">LinkedIn. {t("common.opensInNewTab")}</span>
            </a>
            <a
              href="https://github.com/daviandradedev"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <Github size={16} aria-hidden="true" />
              <span className="sr-only">GitHub. {t("common.opensInNewTab")}</span>
            </a>
            <a href="mailto:daviandrade.dev@gmail.com" title="E-mail">
              <Mail size={16} aria-hidden="true" />
              <span className="sr-only">E-mail</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
