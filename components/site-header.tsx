"use client";

import Link from "next/link";
import { BrandWordmark } from "@/components/brand-wordmark";
import { PreferencesBar } from "@/components/preferences-bar";
import { AccountControls, type HeaderUser } from "@/components/account-controls";
import { usePortfolioEditor } from "@/components/portfolio-editor";
import { useLanguage } from "@/lib/contexts/language-context";

export function SiteHeader({ user }: { user: HeaderUser | null }) {
  const { t } = useLanguage();
  const editor = usePortfolioEditor();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand-lockup" href="/">
          <BrandWordmark className="brand-wordmark-svg" title="daviandrade.dev" variant="dandrade" />
        </Link>

        <nav className="site-nav" aria-label={t("common.primaryNavigation")}>
          <a href="#resume">{t("nav.resume")}</a>
          <a href="#projects">{t("nav.projects")}</a>
          <a href="#ongoing">{t("nav.ongoing")}</a>
          <a href="#contributions">{t("nav.contributions")}</a>
          <a href="#internal">{t("nav.internal")}</a>
          <a href="#contact">{t("nav.contact")}</a>
        </nav>

        <div className="site-header-tools">
          <PreferencesBar />
          {editor.canEdit ? (
            editor.editing ? (
              <>
                <button
                  type="button"
                  className="header-login"
                  onClick={editor.save}
                  disabled={editor.saving}
                >
                  {editor.saving ? t("editor.saving") : t("editor.save")}
                </button>
                <button type="button" className="header-login" onClick={editor.cancel}>
                  {t("editor.cancel")}
                </button>
              </>
            ) : (
              <button type="button" className="header-login" onClick={() => editor.setEditing(true)}>
                {t("editor.edit")}
              </button>
            )
          ) : null}
          <AccountControls user={user} />
        </div>
      </div>
      {editor.status ? (
        <p className="editor-status" role="status">
          {editor.status}
        </p>
      ) : null}
    </header>
  );
}
