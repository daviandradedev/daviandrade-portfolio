"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";
import { useLanguage } from "@/lib/contexts/language-context";

export function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <p className="site-footer-copy">
            © {year} {t("footer.copy")}
          </p>
          <nav className="site-footer-links" aria-label={t("common.footerLinks")}>
            <a
              href="https://daviandrade.dev"
              className="site-footer-home"
              title="daviandrade.dev"
            >
              <BrandIcon size={16} />
              <span className="sr-only">daviandrade.dev</span>
            </a>
            <a
              href="https://linkedin.com/in/daviandradedev"
              className="site-footer-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <Linkedin size={16} aria-hidden="true" />
              <span className="sr-only">LinkedIn. {t("common.opensInNewTab")}</span>
            </a>
            <a
              href="https://github.com/daviandradedev"
              className="site-footer-github"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <Github size={16} aria-hidden="true" />
              <span className="sr-only">GitHub. {t("common.opensInNewTab")}</span>
            </a>
            <a
              href="mailto:daviandrade.dev@gmail.com"
              className="site-footer-mail"
              title="E-mail"
            >
              <Mail size={16} aria-hidden="true" />
              <span className="sr-only">E-mail</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
