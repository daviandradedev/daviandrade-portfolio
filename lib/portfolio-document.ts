import { getHtmlLang, type Language } from "@/lib/i18n";

export type Localized = {
  en: string;
  pt: string;
};

export type ResumeBlock = "experience" | "research" | "volunteering";

export type ProjectCategory = "projects" | "ongoing" | "contributions" | "internal";

export type ProjectBadge = "liveDemo" | "contribution" | "internal" | "ongoing";

export type ProjectCta = "viewProject" | "viewSite" | "internal";

export type MediaItem =
  | {
      type: "image";
      src: string;
      alt: Localized;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      alt: Localized;
    }
  | {
      type: "embed";
      src: string;
      poster?: string;
      alt: Localized;
    };

export type Profile = {
  name: string;
  headline: Localized;
  location: Localized;
  email: string;
  phone: string;
  phoneHref: string;
  website: string;
  github: string;
  linkedin: string;
  lattes: string;
  summary: Localized;
  interests: Localized;
};

export type EducationEntry = {
  id: string;
  period: Localized;
  title: Localized;
  org: Localized;
  location: Localized;
  inProgress?: boolean;
};

export type TimelineLink = {
  label: Localized;
  href: string;
};

export type TimelineEntry = {
  id: string;
  block: ResumeBlock;
  period: Localized;
  title: Localized;
  org: Localized;
  location: Localized;
  current?: boolean;
  bullets: Localized[];
  links: TimelineLink[];
  tags: string[];
};

export type SkillGroup = {
  id: string;
  label: Localized;
  items: Localized[];
};

export type Publication = {
  id: string;
  text: Localized;
  href: string;
};

export type Affiliation = {
  id: string;
  title: Localized;
  period: Localized;
  href: string;
};

export type ProjectEntry = {
  id: string;
  category: ProjectCategory;
  title: Localized;
  body: Localized;
  href: string;
  internal: boolean;
  ongoing: boolean;
  cover: string;
  coverAlt: Localized;
  accent: string;
  highlights: Localized[];
  media: MediaItem[];
};

export type PortfolioDocument = {
  version: 1;
  profile: Profile;
  education: EducationEntry[];
  timeline: TimelineEntry[];
  skills: SkillGroup[];
  publications: Publication[];
  affiliations: Affiliation[];
  projects: ProjectEntry[];
};

export type DocumentIssue = "invalid" | "vercel-link" | "invalid-link";

const ID_PATTERN = /^[a-z0-9-]{1,80}$/;
const MAX_BODY = 4000;
const MAX_SHORT = 240;

export function localized(value: Localized, language: Language) {
  const preferred = value[language]?.trim();
  if (preferred) return preferred;
  return value.en.trim() || value.pt.trim();
}

export function textPair(en: string, pt: string): Localized {
  return { en, pt };
}

export function projectBadge(project: Pick<ProjectEntry, "category" | "ongoing" | "internal">): ProjectBadge {
  if (project.category === "internal" || project.internal) return project.ongoing ? "ongoing" : "internal";
  if (project.category === "contributions") return "contribution";
  if (project.category === "ongoing" || project.ongoing) return "ongoing";
  return "liveDemo";
}

export function projectCta(project: Pick<ProjectEntry, "category" | "internal" | "href">): ProjectCta {
  if (project.internal || project.category === "internal" || !project.href.trim()) return "internal";
  if (project.category === "projects") return "viewProject";
  return "viewSite";
}

export function projectsIn(
  document: PortfolioDocument,
  category: ProjectCategory,
  language: Language,
) {
  return document.projects
    .filter((project) => project.category === category)
    .sort((left, right) => {
      const byVisibility = Number(left.internal) - Number(right.internal);
      if (byVisibility !== 0) return byVisibility;
      const byTitle = localized(left.title, language).localeCompare(
        localized(right.title, language),
        getHtmlLang(language),
        { numeric: true, sensitivity: "base" },
      );
      if (byTitle !== 0) return byTitle;
      return left.id.localeCompare(right.id);
    });
}

export function opensNewTab(href: string) {
  return href.startsWith("https://") || href.startsWith("http://");
}

export function hrefIssue(href: string): DocumentIssue | null {
  const value = href.trim();
  if (!value) return null;
  if (value.toLowerCase().includes(".vercel")) return "vercel-link";
  if (
    value.startsWith("https://") ||
    value.startsWith("http://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    (value.startsWith("/") && !value.startsWith("//") && !value.includes("..")) ||
    /^#[A-Za-z0-9_-]+$/.test(value)
  ) {
    return null;
  }
  return "invalid-link";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length > max) return null;
  return trimmed;
}

function readLocalized(value: unknown, max: number): Localized | null {
  if (!isRecord(value)) return null;
  const en = readString(value.en, max);
  const pt = readString(value.pt, max);
  if (en === null || pt === null) return null;
  if (!en && !pt) return null;
  return { en, pt };
}

function readOptionalLocalized(value: unknown, max: number): Localized | null {
  if (!isRecord(value)) return null;
  const en = readString(value.en, max);
  const pt = readString(value.pt, max);
  if (en === null || pt === null) return null;
  return { en, pt };
}

function readId(value: unknown, seen: Set<string>) {
  const id = readString(value, 80);
  if (!id || !ID_PATTERN.test(id) || seen.has(id)) return null;
  seen.add(id);
  return id;
}

export function parsePortfolioDocument(
  value: unknown,
): { ok: true; document: PortfolioDocument } | { ok: false; issue: DocumentIssue } {
  if (!isRecord(value) || value.version !== 1) return { ok: false, issue: "invalid" };
  const seen = new Set<string>();
  const profile = readProfile(value.profile);
  const education = profile ? readEducation(value.education, seen) : null;
  const timeline = education ? readTimeline(value.timeline, seen) : null;
  const skills = timeline ? readSkills(value.skills, seen) : null;
  const publications = skills ? readPublications(value.publications, seen) : null;
  const affiliations = publications ? readAffiliations(value.affiliations, seen) : null;
  const projects = affiliations ? readProjects(value.projects, seen) : null;
  if (!profile || !education || !timeline || !skills || !publications || !affiliations || !projects) {
    return { ok: false, issue: "invalid" };
  }
  const linkIssue = firstLinkIssue(profile, timeline, publications, affiliations, projects);
  if (linkIssue) return { ok: false, issue: linkIssue };
  return {
    ok: true,
    document: {
      version: 1,
      profile,
      education,
      timeline,
      skills,
      publications,
      affiliations,
      projects,
    },
  };
}

function firstLinkIssue(
  profile: Profile,
  timeline: TimelineEntry[],
  publications: Publication[],
  affiliations: Affiliation[],
  projects: ProjectEntry[],
) {
  const hrefs = [
    profile.phoneHref,
    profile.website,
    profile.github,
    profile.linkedin,
    profile.lattes,
    profile.email ? `mailto:${profile.email}` : "",
    ...timeline.flatMap((entry) => entry.links.map((link) => link.href)),
    ...publications.map((item) => item.href),
    ...affiliations.map((item) => item.href),
    ...projects.map((project) => project.href),
    ...projects.flatMap((project) => project.media.map((item) => item.src)),
  ];
  for (const href of hrefs) {
    const issue = hrefIssue(href);
    if (issue) return issue;
  }
  return null;
}

function readProfile(value: unknown): Profile | null {
  if (!isRecord(value)) return null;
  const name = readString(value.name, 120);
  const headline = readLocalized(value.headline, MAX_SHORT);
  const location = readLocalized(value.location, MAX_SHORT);
  const email = readString(value.email, 160);
  const phone = readString(value.phone, 40);
  const phoneHref = readString(value.phoneHref, 40);
  const website = readString(value.website, 200);
  const github = readString(value.github, 200);
  const linkedin = readString(value.linkedin, 200);
  const lattes = readString(value.lattes, 200);
  const summary = readLocalized(value.summary, MAX_BODY);
  const interests = readLocalized(value.interests, MAX_BODY);
  if (
    !name ||
    !headline ||
    !location ||
    !email ||
    !email.includes("@") ||
    !phone ||
    !phoneHref ||
    !website ||
    !github ||
    !linkedin ||
    !lattes ||
    !summary ||
    !interests
  ) {
    return null;
  }
  return {
    name,
    headline,
    location,
    email,
    phone,
    phoneHref,
    website,
    github,
    linkedin,
    lattes,
    summary,
    interests,
  };
}

function readEducation(value: unknown, seen: Set<string>): EducationEntry[] | null {
  if (!Array.isArray(value) || value.length > 12) return null;
  const entries: EducationEntry[] = [];
  for (const item of value) {
    if (!isRecord(item)) return null;
    const id = readId(item.id, seen);
    const period = readLocalized(item.period, MAX_SHORT);
    const title = readLocalized(item.title, MAX_SHORT);
    const org = readLocalized(item.org, MAX_SHORT);
    const location = readLocalized(item.location, MAX_SHORT);
    if (!id || !period || !title || !org || !location) return null;
    entries.push({
      id,
      period,
      title,
      org,
      location,
      inProgress: item.inProgress === true,
    });
  }
  return entries;
}

function readTimeline(value: unknown, seen: Set<string>): TimelineEntry[] | null {
  if (!Array.isArray(value) || value.length > 40) return null;
  const entries: TimelineEntry[] = [];
  for (const item of value) {
    if (!isRecord(item)) return null;
    const id = readId(item.id, seen);
    const block = item.block;
    if (block !== "experience" && block !== "research" && block !== "volunteering") return null;
    const period = readLocalized(item.period, MAX_SHORT);
    const title = readLocalized(item.title, MAX_SHORT);
    const org = readLocalized(item.org, MAX_SHORT);
    const location = readLocalized(item.location, MAX_SHORT);
    const bullets = readLocalizedList(item.bullets, 12, MAX_BODY);
    const links = readLinks(item.links);
    const tags = readTags(item.tags);
    if (!id || !period || !title || !org || !location || !bullets || !links || !tags) return null;
    entries.push({
      id,
      block,
      period,
      title,
      org,
      location,
      current: item.current === true,
      bullets,
      links,
      tags,
    });
  }
  return entries;
}

function readSkills(value: unknown, seen: Set<string>): SkillGroup[] | null {
  if (!Array.isArray(value) || value.length > 16) return null;
  const groups: SkillGroup[] = [];
  for (const item of value) {
    if (!isRecord(item)) return null;
    const id = readId(item.id, seen);
    const label = readLocalized(item.label, MAX_SHORT);
    const items = readLocalizedList(item.items, 24, 80);
    if (!id || !label || !items) return null;
    groups.push({ id, label, items });
  }
  return groups;
}

function readPublications(value: unknown, seen: Set<string>): Publication[] | null {
  if (!Array.isArray(value) || value.length > 20) return null;
  const items: Publication[] = [];
  for (const item of value) {
    if (!isRecord(item)) return null;
    const id = readId(item.id, seen);
    const text = readLocalized(item.text, MAX_BODY);
    const href = readString(item.href, 500) ?? "";
    if (!id || !text) return null;
    items.push({ id, text, href });
  }
  return items;
}

function readAffiliations(value: unknown, seen: Set<string>): Affiliation[] | null {
  if (!Array.isArray(value) || value.length > 20) return null;
  const items: Affiliation[] = [];
  for (const item of value) {
    if (!isRecord(item)) return null;
    const id = readId(item.id, seen);
    const title = readLocalized(item.title, MAX_SHORT);
    const period = readLocalized(item.period, MAX_SHORT);
    const href = readString(item.href, 500) ?? "";
    if (!id || !title || !period) return null;
    items.push({ id, title, period, href });
  }
  return items;
}

function readProjects(value: unknown, seen: Set<string>): ProjectEntry[] | null {
  if (!Array.isArray(value) || value.length > 40) return null;
  const projects: ProjectEntry[] = [];
  for (const item of value) {
    if (!isRecord(item)) return null;
    const id = readId(item.id, seen);
    const category = item.category;
    if (
      category !== "projects" &&
      category !== "ongoing" &&
      category !== "contributions" &&
      category !== "internal"
    ) {
      return null;
    }
    const title = readLocalized(item.title, MAX_SHORT);
    const body = readLocalized(item.body, MAX_BODY);
    const href = readString(item.href, 500) ?? "";
    const cover = readString(item.cover, 300);
    const coverAlt = readLocalized(item.coverAlt, MAX_SHORT);
    const accent = readString(item.accent, 180);
    const highlights = readLocalizedList(item.highlights, 8, 80);
    const media = readMedia(item.media);
    if (!id || !title || !body || !cover || !coverAlt || !accent || !highlights || !media) return null;
    if (!cover.startsWith("/")) return null;
    projects.push({
      id,
      category,
      title,
      body,
      href,
      internal: item.internal === true || category === "internal",
      ongoing: item.ongoing === true || category === "ongoing",
      cover,
      coverAlt,
      accent,
      highlights,
      media,
    });
  }
  return projects;
}

function readLocalizedList(value: unknown, maxItems: number, maxLength: number) {
  if (!Array.isArray(value) || value.length > maxItems) return null;
  const items: Localized[] = [];
  for (const item of value) {
    const text = readOptionalLocalized(item, maxLength);
    if (!text || (!text.en && !text.pt)) return null;
    items.push(text);
  }
  return items;
}

function readLinks(value: unknown): TimelineLink[] | null {
  if (!Array.isArray(value) || value.length > 6) return null;
  const links: TimelineLink[] = [];
  for (const item of value) {
    if (!isRecord(item)) return null;
    const label = readLocalized(item.label, 80);
    const href = readString(item.href, 500);
    if (!label || !href) return null;
    links.push({ label, href });
  }
  return links;
}

function readTags(value: unknown) {
  if (!Array.isArray(value) || value.length > 12) return null;
  const tags: string[] = [];
  for (const item of value) {
    const tag = readString(item, 40);
    if (!tag) return null;
    tags.push(tag);
  }
  return tags;
}

function readMedia(value: unknown): MediaItem[] | null {
  if (!Array.isArray(value) || value.length > 8) return null;
  const media: MediaItem[] = [];
  for (const item of value) {
    if (!isRecord(item)) return null;
    const type = item.type;
    const src = readString(item.src, 500);
    const alt = readLocalized(item.alt, MAX_SHORT);
    if ((type !== "image" && type !== "video" && type !== "embed") || !src || !alt) return null;
    if (type === "image") {
      media.push({ type, src, alt });
      continue;
    }
    const poster = readString(item.poster, 500) ?? undefined;
    media.push({ type, src, alt, poster });
  }
  return media;
}

export function newId(prefix: string) {
  const token = Math.random().toString(36).slice(2, 10);
  return `${prefix}-${token}`.replace(/[^a-z0-9-]/g, "").slice(0, 80);
}
