import { PDFDocument, PDFString, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { getHtmlLang, translate, type Language } from "@/lib/i18n";
import {
  localized,
  opensNewTab,
  type Affiliation,
  type EducationEntry,
  type PortfolioDocument,
  type ProjectEntry,
  type Publication,
  type SkillGroup,
  type TimelineEntry,
} from "@/lib/portfolio-document";

const PAGE_WIDTH = 595.25;
const PAGE_HEIGHT = 842;
const MARGIN_X = 36;
const MARGIN_BOTTOM = 40;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;
const BODY = 12;
const NAME = 14;
const NAME_BASELINE = 763.4;
const LINE = 16;
const HEADER = 24;
const AFTER_SECTION = 26;
const BETWEEN_DEGREES = 32;
const BETWEEN_ROLES = 24;
const HANG = 18;

const INK = rgb(0, 0, 0);
const LINK = rgb(5 / 255, 99 / 255, 193 / 255);

type Run = { text: string; href?: string; bold?: boolean; font?: PDFFont };

export type PdfBlock =
  | { kind: "name"; text: string }
  | { kind: "centered"; runs: Run[] }
  | { kind: "section"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "entry-title"; text: string }
  | { kind: "entry-meta"; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "skill"; label: string; items: string }
  | { kind: "link"; text: string; href: string };

export function resumePdfBlocks(document: PortfolioDocument, language: Language): PdfBlock[] {
  const profile = document.profile;
  const blocks: PdfBlock[] = [
    { kind: "name", text: profile.name },
    {
      kind: "centered",
      runs: [
        { text: localized(profile.location, language) },
        { text: profile.phone },
      ],
    },
    {
      kind: "centered",
      runs: [
        { text: profile.email, href: `mailto:${profile.email}` },
        { text: "LinkedIn", href: profile.linkedin },
        { text: "GitHub", href: profile.github },
        { text: translate(language, "resume.portfolio"), href: profile.website },
      ],
    },
    { kind: "section", text: translate(language, "resume.interestsTitle") },
    { kind: "paragraph", text: localized(profile.interests, language) },
    { kind: "section", text: translate(language, "resume.blocks.education") },
    ...document.education.flatMap((entry) => educationBlocks(entry, language)),
  ];

  const timelineOrder = ["research", "publications", "experience", "volunteering"] as const;
  for (const block of timelineOrder) {
    if (block === "publications") {
      if (document.publications.length === 0) continue;
      blocks.push({ kind: "section", text: translate(language, "resume.blocks.publications") });
      for (const item of document.publications) blocks.push(...publicationBlocks(item, language));
      continue;
    }
    const entries = document.timeline.filter((entry) => entry.block === block);
    if (entries.length === 0) continue;
    blocks.push({ kind: "section", text: translate(language, `resume.blocks.${block}`) });
    for (const entry of entries) blocks.push(...timelineBlocks(entry, language));
  }

  if (document.skills.length > 0) {
    blocks.push({ kind: "section", text: translate(language, "resume.skills.title") });
    for (const group of document.skills) blocks.push(skillBlock(group, language));
  }

  if (document.affiliations.length > 0) {
    blocks.push({ kind: "section", text: translate(language, "resume.blocks.affiliations") });
    for (const item of document.affiliations) blocks.push(...affiliationBlocks(item, language));
  }

  if (document.projects.length > 0) {
    blocks.push({ kind: "section", text: translate(language, "resume.blocks.projects") });
    for (const project of projectsForPdf(document, language)) {
      blocks.push(...projectBlocks(project, language));
    }
  }

  return blocks;
}

function projectsForPdf(document: PortfolioDocument, language: Language) {
  return [...document.projects].sort((left, right) => {
    const byTitle = localized(left.title, language).localeCompare(
      localized(right.title, language),
      getHtmlLang(language),
      { numeric: true, sensitivity: "base" },
    );
    if (byTitle !== 0) return byTitle;
    return left.id.localeCompare(right.id);
  });
}

function educationBlocks(entry: EducationEntry, language: Language): PdfBlock[] {
  return [
    { kind: "entry-title", text: localized(entry.title, language) },
    {
      kind: "entry-meta",
      text: `${localized(entry.org, language)}, ${localized(entry.location, language)} | ${localized(entry.period, language)}`,
    },
  ];
}

function timelineBlocks(entry: TimelineEntry, language: Language): PdfBlock[] {
  const title = localized(entry.title, language);
  const org = localized(entry.org, language);
  const place = localized(entry.location, language);
  const period = localized(entry.period, language);
  const heading = entry.block === "research" ? title : `${title} | ${org}`;
  const meta =
    entry.block === "research" ? `${org}, ${place} | ${period}` : `${place} | ${period}`;
  return [
    { kind: "entry-title", text: heading },
    { kind: "entry-meta", text: meta },
    ...entry.bullets.map((bullet): PdfBlock => ({ kind: "bullet", text: localized(bullet, language) })),
  ];
}

function skillBlock(group: SkillGroup, language: Language): PdfBlock {
  return {
    kind: "skill",
    label: localized(group.label, language),
    items: group.items.map((item) => localized(item, language)).join(", "),
  };
}

function publicationBlocks(item: Publication, language: Language): PdfBlock[] {
  const text = localized(item.text, language);
  const split = text.indexOf(": ");
  if (split === -1) return [{ kind: "paragraph", text }];
  return [
    { kind: "entry-title", text: text.slice(0, split) },
    { kind: "paragraph", text: text.slice(split + 2) },
  ];
}

function affiliationBlocks(item: Affiliation, language: Language): PdfBlock[] {
  return [
    {
      kind: "paragraph",
      text: `${localized(item.title, language)} | ${localized(item.period, language)}`,
    },
  ];
}

function projectBlocks(project: ProjectEntry, language: Language): PdfBlock[] {
  const blocks: PdfBlock[] = [
    { kind: "entry-title", text: localized(project.title, language) },
    { kind: "paragraph", text: localized(project.body, language) },
  ];
  if (opensNewTab(project.href)) {
    blocks.push({ kind: "link", text: project.href, href: project.href });
  }
  return blocks;
}

function pdfSafe(value: string) {
  return value.replaceAll("·", "|");
}

type Piece = { text: string; font: PDFFont; href?: string };

export async function renderResumePdf(document: PortfolioDocument, language: Language) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.TimesRoman);
  const bold = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const hyphenFont = await pdf.embedFont(StandardFonts.Helvetica);
  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let cursor = NAME_BASELINE;
  let previous: PdfBlock["kind"] | "start" = "start";

  const fontFor = (isBold?: boolean) => (isBold ? bold : regular);

  const gapBefore = (kind: PdfBlock["kind"]) => {
    if (previous === "start") return 0;
    if (previous === "section") return AFTER_SECTION;
    if (kind === "centered" || kind === "section") return HEADER;
    if (kind === "entry-title" && previous === "entry-meta") return BETWEEN_DEGREES;
    if (kind === "entry-title") return BETWEEN_ROLES;
    return LINE;
  };

  const place = (gap: number) => {
    if (previous !== "start") cursor -= gap;
    if (cursor < MARGIN_BOTTOM) {
      page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      cursor = NAME_BASELINE;
    }
    return cursor;
  };

  const link = (target: PDFPage, x: number, baseline: number, width: number, href: string) => {
    const annotation = pdf.context.register(
      pdf.context.obj({
        Type: "Annot",
        Subtype: "Link",
        Rect: [x, baseline - 2, x + width, baseline + BODY],
        Border: [0, 0, 0],
        A: {
          Type: "Action",
          S: "URI",
          URI: PDFString.of(href),
        },
      }),
    );
    target.node.addAnnot(annotation);
  };

  const paintLine = (pieces: Piece[], x: number, size: number, gap: number) => {
    const baseline = place(gap);
    let pen = x;
    for (const piece of pieces) {
      if (!piece.text) continue;
      const width = piece.font.widthOfTextAtSize(piece.text, size);
      const color = piece.href ? LINK : INK;
      page.drawText(piece.text, { x: pen, y: baseline, size, font: piece.font, color });
      if (piece.href) {
        page.drawLine({
          start: { x: pen, y: baseline - 1.4 },
          end: { x: pen + width, y: baseline - 1.4 },
          thickness: 0.4,
          color: LINK,
        });
        link(page, pen, baseline, width, piece.href);
      }
      pen += width;
    }
  };

  const drawFlow = (runs: Run[], size: number, gap: number, hang = 0) => {
    const words: Piece[] = [];
    for (const run of runs) {
      const face = run.font ?? fontFor(run.bold);
      for (const text of pdfSafe(run.text).split(/(\s+)/)) {
        if (!text) continue;
        words.push({ text, font: face, href: run.href });
      }
    }
    let line: Piece[] = [];
    let width = 0;
    let wrapped = false;
    const limit = () => CONTENT_WIDTH - (wrapped ? hang : 0);
    const flush = () => {
      while (line.length > 0 && line[line.length - 1]?.text.trim() === "") line.pop();
      if (line.length === 0) return;
      paintLine(line, MARGIN_X + (wrapped ? hang : 0), size, wrapped ? LINE : gap);
      line = [];
      width = 0;
      wrapped = true;
    };
    for (const word of words) {
      const wordWidth = word.font.widthOfTextAtSize(word.text, size);
      if (width + wordWidth > limit() && line.some((piece) => piece.text.trim())) flush();
      if (line.length === 0 && word.text.trim() === "") continue;
      line.push(word);
      width += wordWidth;
    }
    flush();
  };

  const drawCentered = (runs: Run[], size: number, gap: number) => {
    const separator = " | ";
    const parts: Piece[] = [];
    runs.forEach((run, index) => {
      if (index > 0) parts.push({ text: separator, font: regular });
      parts.push({ text: pdfSafe(run.text), font: run.font ?? fontFor(run.bold), href: run.href });
    });
    const width = parts.reduce((sum, part) => sum + part.font.widthOfTextAtSize(part.text, size), 0);
    paintLine(parts, (PAGE_WIDTH - width) / 2, size, gap);
  };

  for (const block of resumePdfBlocks(document, language)) {
    const gap = gapBefore(block.kind);
    if (block.kind === "name") {
      const text = pdfSafe(block.text);
      const width = bold.widthOfTextAtSize(text, NAME);
      paintLine([{ text, font: bold }], (PAGE_WIDTH - width) / 2, NAME, gap);
    } else if (block.kind === "centered") {
      drawCentered(block.runs, BODY, gap);
    } else if (block.kind === "section") {
      const baseline = place(gap);
      const text = pdfSafe(block.text).toUpperCase();
      page.drawText(text, { x: MARGIN_X, y: baseline, size: BODY, font: bold, color: INK });
      page.drawLine({
        start: { x: MARGIN_X, y: baseline - 2 },
        end: { x: PAGE_WIDTH - MARGIN_X, y: baseline - 2 },
        thickness: 0.6,
        color: INK,
      });
    } else if (block.kind === "entry-title") {
      drawFlow([{ text: block.text, bold: true }], BODY, gap);
    } else if (block.kind === "entry-meta" || block.kind === "paragraph") {
      drawFlow([{ text: block.text }], BODY, gap);
    } else if (block.kind === "skill") {
      drawFlow(
        [
          { text: `${block.label}:`, bold: true },
          { text: ` ${block.items}` },
        ],
        BODY,
        gap,
      );
    } else if (block.kind === "link") {
      drawFlow([{ text: block.text, href: block.href }], BODY, gap);
    } else {
      drawFlow(
        [
          { text: "- ", font: hyphenFont },
          { text: block.text },
        ],
        BODY,
        gap,
        HANG,
      );
    }
    previous = block.kind;
  }

  pdf.setTitle(`${document.profile.name} CV`);
  pdf.setAuthor(document.profile.name);
  pdf.setLanguage(language === "pt" ? "pt-BR" : "en");
  return pdf.save();
}

export function resumePdfFilename(language: Language) {
  return language === "pt" ? "Davi-Andrade-CV-pt.pdf" : "Davi-Andrade-CV-en.pdf";
}

export async function downloadResumePdf(document: PortfolioDocument, language: Language) {
  const bytes = await renderResumePdf(document, language);
  const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.href = url;
  anchor.download = resumePdfFilename(language);
  anchor.click();
  URL.revokeObjectURL(url);
}
