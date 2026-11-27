"use client";

import { ArrowDownRight, FileText, Search } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/language-context";
import { translateList } from "@/lib/i18n";
import { useCommandShortcutLabel } from "@/lib/shortcut";

export function HeroPanel({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { language, t } = useLanguage();
  const shortcutLabel = useCommandShortcutLabel();
  const focusItems = translateList(language, "hero.focusItems");
  const proofCards = [
    {
      index: "01",
      eyebrow: t("hero.proof.work.eyebrow"),
      title: t("hero.proof.work.title"),
      body: t("hero.proof.work.body"),
      href: "#resume",
    },
    {
      index: "02",
      eyebrow: t("hero.proof.research.eyebrow"),
      title: t("hero.proof.research.title"),
      body: t("hero.proof.research.body"),
      href: "#project-asebili-instructor",
    },
    {
      index: "03",
      eyebrow: t("hero.proof.credentials.eyebrow"),
      title: t("hero.proof.credentials.title"),
      body: t("hero.proof.credentials.body"),
      href: "#project-auth-hub",
    },
  ];

  return (
    <section className="hero-panel">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="hero-status-dot" aria-hidden="true" />
            <span>{t("hero.eyebrow")}</span>
          </p>
          <h1 className="hero-title">
            {t("hero.titleFirst")}{" "}
            <span className="hero-highlight">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="hero-role">{t("hero.role")}</p>
          <p className="hero-body">
            {t("hero.bodyLead")}{" "}
            <strong>{t("hero.bodyHighlight1")}</strong>
            {t("hero.bodyMiddle")}{" "}
            <strong className="hero-highlight">{t("hero.bodyHighlight2")}</strong>
            {t("hero.bodyEnd")}
          </p>
          <p className="hero-body hero-body-secondary">{t("hero.bodySecondary")}</p>

          <div className="hero-actions">
            <a href="#projects" className="hero-cta-primary">
              <span>{t("hero.actions.projects")}</span>
              <ArrowDownRight size={16} aria-hidden="true" />
            </a>
            <a href="#resume" className="hero-cta-secondary">
              <FileText size={15} aria-hidden="true" />
              <span>{t("hero.actions.resume")}</span>
            </a>
            <button
              type="button"
              className="hero-cta-ghost"
              onClick={onOpenCommand}
            >
              <Search size={14} aria-hidden="true" />
              <span>{t("hero.actions.command")}</span>
              <kbd className="command-trigger-kbd">{shortcutLabel}</kbd>
            </button>
          </div>
        </div>

        <aside className="hero-visual" aria-label={t("hero.profileAlt")}>
          <div className="hero-photo-frame">
            <Image
              src="/media/profile.png"
              alt={t("hero.profileAlt")}
              width={480}
              height={480}
              className="hero-photo"
              priority
            />
            <p className="hero-photo-caption">{t("hero.portraitBadge")}</p>
          </div>
        </aside>
      </div>

      <div className="hero-proof-grid">
        {proofCards.map((card) => (
          <a key={card.index} href={card.href} className="hero-proof-card">
            <p className="hero-proof-eyebrow">
              <span className="hero-proof-index" aria-hidden="true">
                {card.index}
              </span>
              <span>{card.eyebrow}</span>
            </p>
            <p className="hero-proof-title">{card.title}</p>
            <p className="hero-proof-body">{card.body}</p>
          </a>
        ))}
      </div>

      <div className="focus-block">
        <p className="focus-label">{t("hero.focus")}</p>
        <ul className="focus-list">
          {focusItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
