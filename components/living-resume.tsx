"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { useState } from "react";
import { usePortfolioEditor } from "@/components/portfolio-editor";
import { useLanguage } from "@/lib/contexts/language-context";
import { localized, opensNewTab, type ResumeBlock } from "@/lib/portfolio-document";

const blockOrder: ResumeBlock[] = ["research", "experience", "volunteering"];

const blockTitleKeys = {
  experience: "resume.blocks.experience",
  research: "resume.blocks.research",
  volunteering: "resume.blocks.volunteering",
  education: "resume.blocks.education",
  publications: "resume.blocks.publications",
  affiliations: "resume.blocks.affiliations",
} as const;

export function LivingResume() {
  const { language, t } = useLanguage();
  const editor = usePortfolioEditor();
  const document = editor.document;
  const [preparing, setPreparing] = useState(false);

  return (
    <section className="section-panel living-resume" id="resume">
      <div className="section-head living-resume-head">
        <div>
          <p className="living-resume-eyebrow">{t("resume.eyebrow")}</p>
          <h2>{t("resume.title")}</h2>
          <p>{localized(document.profile.summary, language)}</p>
        </div>
        <div className="resume-actions">
          {editor.editing ? (
            <button type="button" className="resume-download" onClick={editor.openProfile}>
              {t("editor.profile")}
            </button>
          ) : null}
          <button
            type="button"
            className="resume-download"
            disabled={preparing}
            onClick={() => {
              setPreparing(true);
              void import("@/lib/resume-pdf")
                .then((mod) => mod.downloadResumePdf(document, language))
                .finally(() => setPreparing(false));
            }}
          >
            <Download size={16} aria-hidden="true" />
            {preparing ? t("resume.downloading") : t("resume.download")}
          </button>
          <a
            className="resume-download"
            href={document.profile.lattes}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("resume.lattes")}
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> {t("common.opensInNewTab")}</span>
          </a>
        </div>
      </div>

      <div className="resume-interests">
        <h3 className="resume-block-title">{t("resume.interestsTitle")}</h3>
        <p>{localized(document.profile.interests, language)}</p>
      </div>

      <div className="living-resume-grid">
        <div className="living-resume-main">
          <div className="resume-block">
            <div className="resume-block-head">
              <h3 className="resume-block-title">{t(blockTitleKeys.education)}</h3>
              {editor.editing ? (
                <button type="button" className="edit-inline" onClick={() => editor.openEducation(null)}>
                  {t("editor.add")}
                </button>
              ) : null}
            </div>
            <div className="resume-education-grid">
              {document.education.map((entry) => (
                <article key={entry.id} className="resume-education-card">
                  <p className="resume-education-period">{localized(entry.period, language)}</p>
                  <h4 className="resume-education-title">{localized(entry.title, language)}</h4>
                  <p className="resume-education-org">{localized(entry.org, language)}</p>
                  <p className="resume-education-meta">{localized(entry.location, language)}</p>
                  {entry.inProgress ? (
                    <span className="resume-live-badge is-subtle">{t("resume.inProgress")}</span>
                  ) : null}
                  {editor.editing ? (
                    <ItemActions
                      editLabel={t("editor.editItem")}
                      removeLabel={t("editor.remove")}
                      onEdit={() => editor.openEducation(entry.id)}
                      onRemove={() => editor.removeById("education", entry.id)}
                    />
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          {blockOrder.map((block) => {
            const entries = document.timeline.filter((entry) => entry.block === block);
            return (
              <div key={block} className="resume-block">
                <div className="resume-block-head">
                  <h3 className="resume-block-title">{t(blockTitleKeys[block])}</h3>
                  {editor.editing ? (
                    <button type="button" className="edit-inline" onClick={() => editor.openTimeline(null, block)}>
                      {t("editor.add")}
                    </button>
                  ) : null}
                </div>
                {entries.length > 0 ? (
                  <ol className="resume-timeline">
                    {entries.map((entry) => (
                      <li key={entry.id} className="resume-timeline-item">
                        <div className="resume-timeline-marker" aria-hidden="true">
                          <span
                            className={
                              entry.current ? "resume-timeline-dot is-live" : "resume-timeline-dot"
                            }
                          />
                        </div>
                        <article className="resume-entry">
                          <div className="resume-entry-head">
                            <div>
                              <h4 className="resume-entry-title">{localized(entry.title, language)}</h4>
                              <p className="resume-entry-org">{localized(entry.org, language)}</p>
                              <p className="resume-entry-meta">
                                {localized(entry.location, language)} · {localized(entry.period, language)}
                              </p>
                            </div>
                            {entry.current ? (
                              <span className="resume-live-badge">{t("resume.current")}</span>
                            ) : null}
                          </div>
                          <ul className="resume-bullets">
                            {entry.bullets.map((bullet) => (
                              <li key={localized(bullet, language)}>{localized(bullet, language)}</li>
                            ))}
                          </ul>
                          {entry.links.length > 0 ? (
                            <div className="resume-entry-links">
                              {entry.links.map((link) => (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  {...(opensNewTab(link.href)
                                    ? { target: "_blank", rel: "noopener noreferrer" }
                                    : {})}
                                >
                                  {localized(link.label, language)}
                                  <ArrowUpRight size={14} aria-hidden="true" />
                                  {opensNewTab(link.href) ? (
                                    <span className="sr-only"> {t("common.opensInNewTab")}</span>
                                  ) : null}
                                </a>
                              ))}
                            </div>
                          ) : null}
                          {entry.tags.length > 0 ? (
                            <ul className="resume-tags" aria-label={t("resume.tagsLabel")}>
                              {entry.tags.map((tag) => (
                                <li key={tag}>{tag}</li>
                              ))}
                            </ul>
                          ) : null}
                          {editor.editing ? (
                            <ItemActions
                              editLabel={t("editor.editItem")}
                              removeLabel={t("editor.remove")}
                              onEdit={() => editor.openTimeline(entry.id, entry.block)}
                              onRemove={() => editor.removeById("timeline", entry.id)}
                            />
                          ) : null}
                        </article>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </div>
            );
          })}
        </div>

        <aside className="living-resume-side">
          <div className="resume-side-card">
            <div className="resume-block-head">
              <h3 className="resume-block-title">{t("resume.skills.title")}</h3>
              {editor.editing ? (
                <button type="button" className="edit-inline" onClick={() => editor.openSkill(null)}>
                  {t("editor.add")}
                </button>
              ) : null}
            </div>
            <div className="resume-skills">
              {document.skills.map((group) => (
                <div key={group.id} className="resume-skill-group">
                  <p className="resume-skill-label">{localized(group.label, language)}</p>
                  <ul className="resume-skill-list">
                    {group.items.map((item) => (
                      <li key={localized(item, language)}>{localized(item, language)}</li>
                    ))}
                  </ul>
                  {editor.editing ? (
                    <ItemActions
                      editLabel={t("editor.editItem")}
                      removeLabel={t("editor.remove")}
                      onEdit={() => editor.openSkill(group.id)}
                      onRemove={() => editor.removeById("skills", group.id)}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="resume-side-card">
            <div className="resume-block-head">
              <h3 className="resume-block-title">{t(blockTitleKeys.publications)}</h3>
              {editor.editing ? (
                <button type="button" className="edit-inline" onClick={() => editor.openPublication(null)}>
                  {t("editor.add")}
                </button>
              ) : null}
            </div>
            <ul className="resume-simple-list">
              {document.publications.map((publication) => (
                <li key={publication.id}>
                  {publication.href ? (
                    <a
                      href={publication.href}
                      {...(opensNewTab(publication.href)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {localized(publication.text, language)}
                      {opensNewTab(publication.href) ? (
                        <span className="sr-only"> {t("common.opensInNewTab")}</span>
                      ) : null}
                    </a>
                  ) : (
                    localized(publication.text, language)
                  )}
                  {editor.editing ? (
                    <ItemActions
                      editLabel={t("editor.editItem")}
                      removeLabel={t("editor.remove")}
                      onEdit={() => editor.openPublication(publication.id)}
                      onRemove={() => editor.removeById("publications", publication.id)}
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="resume-side-card">
            <div className="resume-block-head">
              <h3 className="resume-block-title">{t(blockTitleKeys.affiliations)}</h3>
              {editor.editing ? (
                <button type="button" className="edit-inline" onClick={() => editor.openAffiliation(null)}>
                  {t("editor.add")}
                </button>
              ) : null}
            </div>
            <ul className="resume-simple-list">
              {document.affiliations.map((item) => (
                <li key={item.id}>
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(opensNewTab(item.href)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <strong>{localized(item.title, language)}</strong>
                      <span>{localized(item.period, language)}</span>
                      {opensNewTab(item.href) ? (
                        <span className="sr-only"> {t("common.opensInNewTab")}</span>
                      ) : null}
                    </a>
                  ) : (
                    <>
                      <strong>{localized(item.title, language)}</strong>
                      <span>{localized(item.period, language)}</span>
                    </>
                  )}
                  {editor.editing ? (
                    <ItemActions
                      editLabel={t("editor.editItem")}
                      removeLabel={t("editor.remove")}
                      onEdit={() => editor.openAffiliation(item.id)}
                      onRemove={() => editor.removeById("affiliations", item.id)}
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ItemActions({
  editLabel,
  removeLabel,
  onEdit,
  onRemove,
}: {
  editLabel: string;
  removeLabel: string;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="edit-actions">
      <button type="button" className="edit-inline" onClick={onEdit}>
        {editLabel}
      </button>
      <button type="button" className="edit-inline" onClick={onRemove}>
        {removeLabel}
      </button>
    </div>
  );
}
