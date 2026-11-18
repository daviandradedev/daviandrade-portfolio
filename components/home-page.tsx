"use client";

import type { ReactNode } from "react";
import { ContactPanel } from "@/components/contact-panel";
import { HeroPanel } from "@/components/hero-panel";
import { LivingResume } from "@/components/living-resume";
import { PortfolioEditor, usePortfolioEditor } from "@/components/portfolio-editor";
import { ProjectCard } from "@/components/project-card";
import { SessionKeepAlive } from "@/components/session-keep-alive";
import { SiteHeader } from "@/components/site-header";
import type { HeaderUser } from "@/components/account-controls";
import { useLanguage } from "@/lib/contexts/language-context";
import {
  localized,
  projectBadge,
  projectCta,
  projectsIn,
  type PortfolioDocument,
  type ProjectCategory,
  type ProjectEntry,
} from "@/lib/portfolio-document";

export function HomePage({
  initialDocument,
  user,
  canEdit,
}: {
  initialDocument: PortfolioDocument;
  user: HeaderUser | null;
  canEdit: boolean;
}) {
  return (
    <PortfolioEditor initialDocument={initialDocument} canEdit={canEdit}>
      {user ? <SessionKeepAlive /> : null}
      <SiteHeader user={user} />
      <HomeMain />
    </PortfolioEditor>
  );
}

function HomeMain() {
  const { t, language } = useLanguage();
  const editor = usePortfolioEditor();

  const renderProjectCard = (project: ProjectEntry) => (
    <ProjectCard
      key={project.id}
      projectId={project.id}
      badge={t(`common.${projectBadge(project)}`)}
      title={localized(project.title, language)}
      body={localized(project.body, language)}
      href={project.href || undefined}
      internal={project.internal}
      ongoing={project.ongoing}
      ctaLabel={t(`common.${projectCta(project)}`)}
      cover={project.cover}
      coverAlt={localized(project.coverAlt, language)}
      accent={project.accent}
      highlights={project.highlights.map((item) => localized(item, language))}
      media={project.media.map((item) => ({
        ...item,
        alt: localized(item.alt, language),
      }))}
      galleryLabel={t("common.mediaGallery")}
      closeGalleryLabel={t("common.closeGallery")}
      expandLabel={t("common.expandPreview")}
      playVideoLabel={t("common.playVideo")}
      previousMediaLabel={t("common.previousMedia")}
      nextMediaLabel={t("common.nextMedia")}
      highlightsLabel={t("common.projectHighlights")}
      opensInNewTab={t("common.opensInNewTab")}
      toolbar={
        editor.editing ? (
          <div className="edit-actions">
            <button
              type="button"
              className="edit-inline"
              onClick={() => editor.openProject(project.id, project.category)}
            >
              {t("editor.editItem")}
            </button>
            <button
              type="button"
              className="edit-inline"
              onClick={() => editor.removeById("projects", project.id)}
            >
              {t("editor.remove")}
            </button>
          </div>
        ) : null
      }
    />
  );

  return (
    <main className="page-shell" id="main-content">
      <HeroPanel />
      <LivingResume />
      <ProjectSection
        id="projects"
        category="projects"
        title={t("sections.projectsTitle")}
        body={t("sections.projectsBody")}
        renderCard={renderProjectCard}
      />
      <ProjectSection
        id="ongoing"
        category="ongoing"
        title={t("sections.ongoingTitle")}
        renderCard={renderProjectCard}
        compact
      />
      <ProjectSection
        id="contributions"
        category="contributions"
        title={t("sections.contributionsTitle")}
        body={t("sections.contributionsBody")}
        renderCard={renderProjectCard}
      />
      <ProjectSection
        id="internal"
        category="internal"
        title={t("sections.internalTitle")}
        body={t("sections.internalBody")}
        renderCard={renderProjectCard}
      />
      <ContactPanel profile={editor.document.profile} />
    </main>
  );
}

function ProjectSection({
  id,
  category,
  title,
  body,
  compact = false,
  renderCard,
}: {
  id: string;
  category: ProjectCategory;
  title: string;
  body?: string;
  compact?: boolean;
  renderCard: (project: ProjectEntry) => ReactNode;
}) {
  const { t, language } = useLanguage();
  const editor = usePortfolioEditor();
  const projects = projectsIn(editor.document, category, language);

  return (
    <section className="section-panel" id={id}>
      <div className={compact ? "section-head section-head-compact" : "section-head"}>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
        {editor.editing ? (
          <button type="button" className="edit-inline" onClick={() => editor.openProject(null, category)}>
            {t("editor.add")}
          </button>
        ) : null}
      </div>
      <div className="card-grid">{projects.map((project) => renderCard(project))}</div>
    </section>
  );
}
