import type { Language } from "@/lib/i18n";

export type ResumeDocument = {
  id: string;
  kind: "academic" | "professional";
  langTag: "PT-BR" | "EN";
  language: Language;
  titleKey: string;
  descriptionKey: string;
  href: string;
  filename: string;
};

export const RESUME_DOCUMENTS: readonly ResumeDocument[] = [
  {
    id: "academic-pt",
    kind: "academic",
    langTag: "PT-BR",
    language: "pt",
    titleKey: "cv.items.academicPt.title",
    descriptionKey: "cv.items.academicPt.description",
    href: "/resume/Davi-Andrade-Curriculo-Academico-PT.pdf",
    filename: "Davi-Andrade-Curriculo-Academico-PT.pdf",
  },
  {
    id: "professional-pt",
    kind: "professional",
    langTag: "PT-BR",
    language: "pt",
    titleKey: "cv.items.professionalPt.title",
    descriptionKey: "cv.items.professionalPt.description",
    href: "/resume/Davi-Andrade-Curriculo-Profissional-PT.pdf",
    filename: "Davi-Andrade-Curriculo-Profissional-PT.pdf",
  },
  {
    id: "academic-en",
    kind: "academic",
    langTag: "EN",
    language: "en",
    titleKey: "cv.items.academicEn.title",
    descriptionKey: "cv.items.academicEn.description",
    href: "/resume/Davi-Andrade-Academic-CV-EN.pdf",
    filename: "Davi-Andrade-Academic-CV-EN.pdf",
  },
  {
    id: "professional-en",
    kind: "professional",
    langTag: "EN",
    language: "en",
    titleKey: "cv.items.professionalEn.title",
    descriptionKey: "cv.items.professionalEn.description",
    href: "/resume/Davi-Andrade-Professional-Resume-EN.pdf",
    filename: "Davi-Andrade-Professional-Resume-EN.pdf",
  },
];

export function orderedResumes(language: Language): ResumeDocument[] {
  return [...RESUME_DOCUMENTS].sort(
    (left, right) =>
      Number(right.language === language) - Number(left.language === language),
  );
}
