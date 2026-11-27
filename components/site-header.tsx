"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  Briefcase,
  FileText,
  FolderGit2,
  GitBranch,
  Layers,
  Mail,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { AccountControls, type HeaderUser } from "@/components/account-controls";
import { BrandWordmark } from "@/components/brand-wordmark";
import { useOptionalPortfolioEditor } from "@/components/portfolio-editor";
import { PreferencesBar } from "@/components/preferences-bar";
import { useLanguage } from "@/lib/contexts/language-context";
import { useCommandShortcutLabel } from "@/lib/shortcut";

export function SiteHeader({
  user,
  onOpenCommand,
  activeRoute,
}: {
  user: HeaderUser | null;
  onOpenCommand?: () => void;
  activeRoute?: string;
}) {
  const { t } = useLanguage();
  const editor = useOptionalPortfolioEditor();
  const [menuOpen, setMenuOpen] = useState(false);
  const shortcutLabel = useCommandShortcutLabel();
  const prefix = activeRoute ? "/" : "";

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const primaryLinks = [
    { href: `${prefix}#cv`, label: t("nav.resume") },
    { href: `${prefix}#projects`, label: t("nav.projects") },
    { href: `${prefix}#contributions`, label: t("nav.contributions") },
    { href: activeRoute === "/contact" ? "/contact" : "#contact", label: t("nav.contact") },
  ];

  const allLinks = [
    { href: `${prefix}#cv`, label: t("nav.cv"), icon: FileText },
    { href: `${prefix}#resume`, label: t("nav.livingResume"), icon: Briefcase },
    { href: `${prefix}#projects`, label: t("nav.projects"), icon: Layers },
    { href: `${prefix}#ongoing`, label: t("nav.ongoing"), icon: Sparkles },
    { href: `${prefix}#contributions`, label: t("nav.contributions"), icon: GitBranch },
    { href: `${prefix}#internal`, label: t("nav.internal"), icon: FolderGit2 },
    { href: "/contact", label: t("nav.contact"), icon: Mail },
  ];

  const editControls = editor?.canEdit ? (
    editor.editing ? (
      <>
        <button
          type="button"
          className="header-login header-login-primary"
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
      <button
        type="button"
        className="header-login"
        onClick={() => {
          editor.setEditing(true);
          setMenuOpen(false);
        }}
      >
        {t("editor.edit")}
      </button>
    )
  ) : null;

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="brand-lockup header-wordmark" href="/">
            <BrandWordmark className="brand-wordmark-header" title="daviandrade.dev" variant="dandrade" />
          </Link>

          <Link className="project-brand" href="/">
            <span className="project-brand-initial">d</span>aviandrade.dev
          </Link>

          <nav className="site-nav" aria-label={t("common.primaryNavigation")}>
            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={activeRoute && item.href === activeRoute ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header-tools">
            {onOpenCommand ? (
              <button
                type="button"
                className="command-trigger"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenCommand();
                }}
                title={t("command.button")}
                aria-keyshortcuts="Meta+K Control+K"
              >
                <Search size={15} aria-hidden="true" />
                <span className="sr-only">{t("command.button")} </span>
                <kbd className="command-trigger-kbd">{shortcutLabel}</kbd>
              </button>
            ) : null}

            <div className="site-header-desktop-controls">
              <PreferencesBar />
              {editControls}
              <AccountControls user={user} />
            </div>

            <button
              type="button"
              className="mobile-menu-trigger"
              aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
        {editor?.status ? (
          <p className="editor-status" role="status" aria-live="polite">
            {editor.status}
          </p>
        ) : null}
      </header>

      {menuOpen ? (
        <div
          className="liquid-glass-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t("common.primaryNavigation")}
        >
          <button
            type="button"
            className="liquid-glass-backdrop"
            aria-label={t("common.closeMenu")}
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
          />
          <button
            type="button"
            className="liquid-glass-close"
            aria-label={t("common.closeMenu")}
            onClick={() => setMenuOpen(false)}
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className="liquid-glass-stack is-grid">
            <div
              className="liquid-glass-toggles-row"
              style={{ "--lg-i": 0 } as CSSProperties}
            >
              <PreferencesBar />
            </div>

            <nav className="liquid-glass-nav is-grid" aria-label={t("common.primaryNavigation")}>
              {allLinks.map((item, idx) => {
                const Icon = item.icon;
                const current = Boolean(activeRoute && item.href === activeRoute);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`liquid-glass-pill${current ? " is-accent" : ""}`}
                    style={{ "--lg-i": idx + 1 } as CSSProperties}
                  >
                    <span className="liquid-glass-icon" aria-hidden="true">
                      <Icon size={15} />
                    </span>
                    <span className="liquid-glass-label">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div
              className="liquid-glass-account-row"
              style={{ "--lg-i": allLinks.length + 1 } as CSSProperties}
            >
              {editControls}
              <AccountControls user={user} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
