"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/contexts/language-context";
import { translateList } from "@/lib/i18n";

export function HeroPanel() {
  const { language, t } = useLanguage();
  const focusItems = translateList(language, "hero.focusItems");
  const stats = [
    { value: t("hero.stats.demos.value"), label: t("hero.stats.demos.label") },
    {
      value: t("hero.stats.platforms.value"),
      label: t("hero.stats.platforms.label"),
    },
    {
      value: t("hero.stats.stack.value"),
      label: t("hero.stats.stack.label"),
    },
  ];

  return (
    <section className="hero-panel">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="hero-title">
            {t("hero.titleFirst")}{" "}
            <span className="hero-highlight">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="hero-body">
            {t("hero.bodyLead")}{" "}
            <strong className="hero-highlight">{t("hero.bodyHighlight1")}</strong>
            {t("hero.bodyMiddle")}{" "}
            <strong className="hero-highlight">{t("hero.bodyHighlight2")}</strong>
            {t("hero.bodyEnd")}
          </p>
          <p className="hero-body hero-body-secondary">{t("hero.bodySecondary")}</p>

          <div className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
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
          </div>
          <div className="hero-card">
            <p className="hero-card-eyebrow">{t("hero.card.eyebrow")}</p>
            <p className="hero-card-title">{t("hero.card.title")}</p>
            <p className="hero-card-body">{t("hero.card.body")}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
