"use client";

import { useState } from "react";
import { EditDialog } from "@/components/edit-dialog";
import { useLanguage } from "@/lib/contexts/language-context";
import {
  newId,
  type Affiliation,
  type EducationEntry,
  type Localized,
  type PortfolioDocument,
  type ProjectCategory,
  type ProjectEntry,
  type Publication,
  type ResumeBlock,
  type SkillGroup,
  type TimelineEntry,
} from "@/lib/portfolio-document";

export type EditorDialog =
  | { kind: "profile" }
  | { kind: "project"; id: string | null; category: ProjectCategory }
  | { kind: "timeline"; id: string | null; block: ResumeBlock }
  | { kind: "education"; id: string | null }
  | { kind: "skill"; id: string | null }
  | { kind: "publication"; id: string | null }
  | { kind: "affiliation"; id: string | null };

const PLACEHOLDER_COVER = "/media/projects/placeholder/cover.svg";

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function zipLines(en: string, pt: string): Localized[] {
  const english = lines(en);
  const portuguese = lines(pt);
  const count = Math.max(english.length, portuguese.length);
  return Array.from({ length: count }, (_, index) => ({
    en: english[index] || portuguese[index] || "",
    pt: portuguese[index] || english[index] || "",
  }));
}

function join(items: Localized[], language: "en" | "pt") {
  return items.map((item) => item[language]).join("\n");
}

function PairFields({
  legend,
  value,
  onChange,
  multiline = false,
  english,
  portuguese,
}: {
  legend: string;
  value: Localized;
  onChange: (value: Localized) => void;
  multiline?: boolean;
  english: string;
  portuguese: string;
}) {
  return (
    <fieldset className="edit-pair">
      <legend>{legend}</legend>
      <label>
        {english}
        {multiline ? (
          <textarea
            value={value.en}
            onChange={(event) => onChange({ ...value, en: event.target.value })}
          />
        ) : (
          <input
            value={value.en}
            onChange={(event) => onChange({ ...value, en: event.target.value })}
          />
        )}
      </label>
      <label>
        {portuguese}
        {multiline ? (
          <textarea
            value={value.pt}
            onChange={(event) => onChange({ ...value, pt: event.target.value })}
          />
        ) : (
          <input
            value={value.pt}
            onChange={(event) => onChange({ ...value, pt: event.target.value })}
          />
        )}
      </label>
    </fieldset>
  );
}

function blankProject(category: ProjectCategory): ProjectEntry {
  return {
    id: newId("project"),
    category,
    title: { en: "", pt: "" },
    body: { en: "", pt: "" },
    href: "",
    internal: category === "internal",
    ongoing: category === "ongoing",
    cover: PLACEHOLDER_COVER,
    coverAlt: { en: "Project cover", pt: "Capa do projeto" },
    accent: "#2d4024",
    highlights: [],
    media: [],
  };
}

export function EditorForm({
  dialog,
  document,
  notice,
  onClose,
  onCommit,
}: {
  dialog: EditorDialog;
  document: PortfolioDocument;
  notice: string | null;
  onClose: () => void;
  onCommit: (document: PortfolioDocument) => void;
}) {
  const { t } = useLanguage();
  const english = t("preferences.english");
  const portuguese = t("preferences.portuguese");

  return (
    <EditDialog title={t("editor.dialog")} closeLabel={t("editor.close")} onClose={onClose}>
      {notice ? <p role="alert">{notice}</p> : null}
      {dialog.kind === "profile" ? (
        <ProfileForm
          profile={document.profile}
          english={english}
          portuguese={portuguese}
          saveLabel={t("editor.save")}
          onSave={(profile) => onCommit({ ...document, profile })}
        />
      ) : null}
      {dialog.kind === "project" ? (
        <ProjectForm
          project={
            document.projects.find((item) => item.id === dialog.id) ??
            blankProject(dialog.category)
          }
          english={english}
          portuguese={portuguese}
          saveLabel={t("editor.save")}
          onSave={(project) =>
            onCommit({
              ...document,
              projects: upsert(document.projects, project),
            })
          }
        />
      ) : null}
      {dialog.kind === "timeline" ? (
        <TimelineForm
          entry={
            document.timeline.find((item) => item.id === dialog.id) ?? {
              id: newId("role"),
              block: dialog.block,
              period: { en: "", pt: "" },
              title: { en: "", pt: "" },
              org: { en: "", pt: "" },
              location: { en: "", pt: "" },
              bullets: [],
              links: [],
              tags: [],
            }
          }
          english={english}
          portuguese={portuguese}
          saveLabel={t("editor.save")}
          onSave={(entry) =>
            onCommit({ ...document, timeline: upsert(document.timeline, entry) })
          }
        />
      ) : null}
      {dialog.kind === "education" ? (
        <EducationForm
          entry={
            document.education.find((item) => item.id === dialog.id) ?? {
              id: newId("study"),
              period: { en: "", pt: "" },
              title: { en: "", pt: "" },
              org: { en: "", pt: "" },
              location: { en: "", pt: "" },
            }
          }
          english={english}
          portuguese={portuguese}
          saveLabel={t("editor.save")}
          onSave={(entry) =>
            onCommit({ ...document, education: upsert(document.education, entry) })
          }
        />
      ) : null}
      {dialog.kind === "skill" ? (
        <SkillForm
          group={
            document.skills.find((item) => item.id === dialog.id) ?? {
              id: newId("skill"),
              label: { en: "", pt: "" },
              items: [],
            }
          }
          english={english}
          portuguese={portuguese}
          saveLabel={t("editor.save")}
          onSave={(group) => onCommit({ ...document, skills: upsert(document.skills, group) })}
        />
      ) : null}
      {dialog.kind === "publication" ? (
        <PublicationForm
          item={
            document.publications.find((entry) => entry.id === dialog.id) ?? {
              id: newId("paper"),
              text: { en: "", pt: "" },
              href: "",
            }
          }
          english={english}
          portuguese={portuguese}
          saveLabel={t("editor.save")}
          onSave={(item) =>
            onCommit({ ...document, publications: upsert(document.publications, item) })
          }
        />
      ) : null}
      {dialog.kind === "affiliation" ? (
        <AffiliationForm
          item={
            document.affiliations.find((entry) => entry.id === dialog.id) ?? {
              id: newId("group"),
              title: { en: "", pt: "" },
              period: { en: "", pt: "" },
              href: "",
            }
          }
          english={english}
          portuguese={portuguese}
          saveLabel={t("editor.save")}
          onSave={(item) =>
            onCommit({ ...document, affiliations: upsert(document.affiliations, item) })
          }
        />
      ) : null}
    </EditDialog>
  );
}

function upsert<T extends { id: string }>(items: T[], next: T) {
  if (items.some((item) => item.id === next.id)) {
    return items.map((item) => (item.id === next.id ? next : item));
  }
  return [...items, next];
}

function ProfileForm({
  profile,
  english,
  portuguese,
  saveLabel,
  onSave,
}: {
  profile: PortfolioDocument["profile"];
  english: string;
  portuguese: string;
  saveLabel: string;
  onSave: (profile: PortfolioDocument["profile"]) => void;
}) {
  const [draft, setDraft] = useState(profile);
  const { t } = useLanguage();
  return (
    <form
      className="edit-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft);
      }}
    >
      <label>
        {t("editor.title")}
        <input
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
          required
        />
      </label>
      <PairFields legend={t("hero.eyebrow")} value={draft.headline} onChange={(headline) => setDraft({ ...draft, headline })} english={english} portuguese={portuguese} />
      <PairFields legend={t("editor.location")} value={draft.location} onChange={(location) => setDraft({ ...draft, location })} english={english} portuguese={portuguese} />
      <PairFields legend={t("resume.blocks.summary")} value={draft.summary} onChange={(summary) => setDraft({ ...draft, summary })} english={english} portuguese={portuguese} multiline />
      <PairFields legend={t("resume.interestsTitle")} value={draft.interests} onChange={(interests) => setDraft({ ...draft, interests })} english={english} portuguese={portuguese} multiline />
      <label>
        {t("contact.email")}
        <input
          type="email"
          autoComplete="email"
          spellCheck={false}
          value={draft.email}
          onChange={(event) => setDraft({ ...draft, email: event.target.value })}
          required
        />
      </label>
      <label>
        {t("contact.phone")}
        <input
          type="tel"
          autoComplete="tel"
          value={draft.phone}
          onChange={(event) =>
            setDraft({
              ...draft,
              phone: event.target.value,
              phoneHref: `tel:+${event.target.value.replace(/\D/g, "")}`,
            })
          }
          required
        />
      </label>
      <label>
        {t("resume.lattes")}
        <input
          type="url"
          spellCheck={false}
          value={draft.lattes}
          onChange={(event) => setDraft({ ...draft, lattes: event.target.value })}
        />
      </label>
      <label>
        {t("editor.href")}
        <input
          type="url"
          spellCheck={false}
          value={draft.website}
          onChange={(event) => setDraft({ ...draft, website: event.target.value })}
        />
      </label>
      <label>
        {t("contact.github")}
        <input
          type="url"
          spellCheck={false}
          value={draft.github}
          onChange={(event) => setDraft({ ...draft, github: event.target.value })}
        />
      </label>
      <label>
        {t("contact.linkedin")}
        <input
          type="url"
          spellCheck={false}
          value={draft.linkedin}
          onChange={(event) => setDraft({ ...draft, linkedin: event.target.value })}
        />
      </label>
      <button type="submit" className="header-login">
        {saveLabel}
      </button>
    </form>
  );
}

function ProjectForm({
  project,
  english,
  portuguese,
  saveLabel,
  onSave,
}: {
  project: ProjectEntry;
  english: string;
  portuguese: string;
  saveLabel: string;
  onSave: (project: ProjectEntry) => void;
}) {
  const { t } = useLanguage();
  const [draft, setDraft] = useState(project);
  const [highlightsEn, setHighlightsEn] = useState(join(project.highlights, "en"));
  const [highlightsPt, setHighlightsPt] = useState(join(project.highlights, "pt"));
  return (
    <form
      className="edit-form"
      onSubmit={(event) => {
        event.preventDefault();
        const category = draft.category;
        onSave({
          ...draft,
          internal: category === "internal" ? true : draft.internal,
          ongoing: category === "ongoing" ? true : draft.ongoing && category !== "projects",
          highlights: zipLines(highlightsEn, highlightsPt),
        });
      }}
    >
      <label>
        {t("editor.category")}
        <select
          value={draft.category}
          onChange={(event) =>
            setDraft({ ...draft, category: event.target.value as ProjectCategory })
          }
        >
          {(["projects", "ongoing", "contributions", "internal"] as const).map((category) => (
            <option key={category} value={category}>
              {t(`editor.categories.${category}`)}
            </option>
          ))}
        </select>
      </label>
      <PairFields legend={t("editor.title")} value={draft.title} onChange={(title) => setDraft({ ...draft, title })} english={english} portuguese={portuguese} />
      <PairFields legend={t("editor.text")} value={draft.body} onChange={(body) => setDraft({ ...draft, body })} english={english} portuguese={portuguese} multiline />
      <label>
        {t("editor.href")}
        <input value={draft.href} onChange={(event) => setDraft({ ...draft, href: event.target.value })} />
      </label>
      <label>
        {t("editor.cover")}
        <input value={draft.cover} onChange={(event) => setDraft({ ...draft, cover: event.target.value })} required />
      </label>
      <PairFields legend={t("editor.cover")} value={draft.coverAlt} onChange={(coverAlt) => setDraft({ ...draft, coverAlt })} english={english} portuguese={portuguese} />
      <fieldset className="edit-pair">
        <legend>{t("editor.highlights")}</legend>
        <label>
          {english}
          <textarea value={highlightsEn} onChange={(event) => setHighlightsEn(event.target.value)} />
        </label>
        <label>
          {portuguese}
          <textarea value={highlightsPt} onChange={(event) => setHighlightsPt(event.target.value)} />
        </label>
      </fieldset>
      <label className="edit-check">
        <input
          type="checkbox"
          checked={draft.internal}
          onChange={(event) => setDraft({ ...draft, internal: event.target.checked })}
        />
        {t("editor.internal")}
      </label>
      <button type="submit" className="header-login">
        {saveLabel}
      </button>
    </form>
  );
}

function TimelineForm({
  entry,
  english,
  portuguese,
  saveLabel,
  onSave,
}: {
  entry: TimelineEntry;
  english: string;
  portuguese: string;
  saveLabel: string;
  onSave: (entry: TimelineEntry) => void;
}) {
  const { t } = useLanguage();
  const [draft, setDraft] = useState(entry);
  const [bulletsEn, setBulletsEn] = useState(join(entry.bullets, "en"));
  const [bulletsPt, setBulletsPt] = useState(join(entry.bullets, "pt"));
  const [tags, setTags] = useState(entry.tags.join(", "));
  return (
    <form
      className="edit-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSave({
          ...draft,
          bullets: zipLines(bulletsEn, bulletsPt),
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        });
      }}
    >
      <label>
        {t("editor.block")}
        <select
          value={draft.block}
          onChange={(event) => setDraft({ ...draft, block: event.target.value as ResumeBlock })}
        >
          {(["research", "experience", "volunteering"] as const).map((block) => (
            <option key={block} value={block}>
              {t(`editor.blocks.${block}`)}
            </option>
          ))}
        </select>
      </label>
      <PairFields legend={t("editor.title")} value={draft.title} onChange={(title) => setDraft({ ...draft, title })} english={english} portuguese={portuguese} />
      <PairFields legend={t("editor.org")} value={draft.org} onChange={(org) => setDraft({ ...draft, org })} english={english} portuguese={portuguese} />
      <PairFields legend={t("editor.location")} value={draft.location} onChange={(location) => setDraft({ ...draft, location })} english={english} portuguese={portuguese} />
      <PairFields legend={t("editor.period")} value={draft.period} onChange={(period) => setDraft({ ...draft, period })} english={english} portuguese={portuguese} />
      <fieldset className="edit-pair">
        <legend>{t("editor.bullets")}</legend>
        <label>
          {english}
          <textarea value={bulletsEn} onChange={(event) => setBulletsEn(event.target.value)} />
        </label>
        <label>
          {portuguese}
          <textarea value={bulletsPt} onChange={(event) => setBulletsPt(event.target.value)} />
        </label>
      </fieldset>
      <label>
        {t("editor.tags")}
        <input value={tags} onChange={(event) => setTags(event.target.value)} />
      </label>
      <label className="edit-check">
        <input
          type="checkbox"
          checked={draft.current === true}
          onChange={(event) => setDraft({ ...draft, current: event.target.checked })}
        />
        {t("editor.current")}
      </label>
      <button type="submit" className="header-login">
        {saveLabel}
      </button>
    </form>
  );
}

function EducationForm({
  entry,
  english,
  portuguese,
  saveLabel,
  onSave,
}: {
  entry: EducationEntry;
  english: string;
  portuguese: string;
  saveLabel: string;
  onSave: (entry: EducationEntry) => void;
}) {
  const { t } = useLanguage();
  const [draft, setDraft] = useState(entry);
  return (
    <form
      className="edit-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft);
      }}
    >
      <PairFields legend={t("editor.title")} value={draft.title} onChange={(title) => setDraft({ ...draft, title })} english={english} portuguese={portuguese} />
      <PairFields legend={t("editor.org")} value={draft.org} onChange={(org) => setDraft({ ...draft, org })} english={english} portuguese={portuguese} />
      <PairFields legend={t("editor.location")} value={draft.location} onChange={(location) => setDraft({ ...draft, location })} english={english} portuguese={portuguese} />
      <PairFields legend={t("editor.period")} value={draft.period} onChange={(period) => setDraft({ ...draft, period })} english={english} portuguese={portuguese} />
      <label className="edit-check">
        <input
          type="checkbox"
          checked={draft.inProgress === true}
          onChange={(event) => setDraft({ ...draft, inProgress: event.target.checked })}
        />
        {t("editor.inProgress")}
      </label>
      <button type="submit" className="header-login">
        {saveLabel}
      </button>
    </form>
  );
}

function SkillForm({
  group,
  english,
  portuguese,
  saveLabel,
  onSave,
}: {
  group: SkillGroup;
  english: string;
  portuguese: string;
  saveLabel: string;
  onSave: (group: SkillGroup) => void;
}) {
  const { t } = useLanguage();
  const [label, setLabel] = useState(group.label);
  const [itemsEn, setItemsEn] = useState(join(group.items, "en"));
  const [itemsPt, setItemsPt] = useState(join(group.items, "pt"));
  return (
    <form
      className="edit-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSave({ ...group, label, items: zipLines(itemsEn, itemsPt) });
      }}
    >
      <PairFields legend={t("editor.label")} value={label} onChange={setLabel} english={english} portuguese={portuguese} />
      <fieldset className="edit-pair">
        <legend>{t("editor.items")}</legend>
        <label>
          {english}
          <textarea value={itemsEn} onChange={(event) => setItemsEn(event.target.value)} />
        </label>
        <label>
          {portuguese}
          <textarea value={itemsPt} onChange={(event) => setItemsPt(event.target.value)} />
        </label>
      </fieldset>
      <button type="submit" className="header-login">
        {saveLabel}
      </button>
    </form>
  );
}

function PublicationForm({
  item,
  english,
  portuguese,
  saveLabel,
  onSave,
}: {
  item: Publication;
  english: string;
  portuguese: string;
  saveLabel: string;
  onSave: (item: Publication) => void;
}) {
  const { t } = useLanguage();
  const [draft, setDraft] = useState(item);
  return (
    <form
      className="edit-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft);
      }}
    >
      <PairFields legend={t("editor.text")} value={draft.text} onChange={(text) => setDraft({ ...draft, text })} english={english} portuguese={portuguese} multiline />
      <label>
        {t("editor.href")}
        <input value={draft.href} onChange={(event) => setDraft({ ...draft, href: event.target.value })} />
      </label>
      <button type="submit" className="header-login">
        {saveLabel}
      </button>
    </form>
  );
}

function AffiliationForm({
  item,
  english,
  portuguese,
  saveLabel,
  onSave,
}: {
  item: Affiliation;
  english: string;
  portuguese: string;
  saveLabel: string;
  onSave: (item: Affiliation) => void;
}) {
  const { t } = useLanguage();
  const [draft, setDraft] = useState(item);
  return (
    <form
      className="edit-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft);
      }}
    >
      <PairFields legend={t("editor.title")} value={draft.title} onChange={(title) => setDraft({ ...draft, title })} english={english} portuguese={portuguese} />
      <PairFields legend={t("editor.period")} value={draft.period} onChange={(period) => setDraft({ ...draft, period })} english={english} portuguese={portuguese} />
      <label>
        {t("editor.href")}
        <input value={draft.href} onChange={(event) => setDraft({ ...draft, href: event.target.value })} />
      </label>
      <button type="submit" className="header-login">
        {saveLabel}
      </button>
    </form>
  );
}
