"use client";

import { BriefcaseBusiness, Download, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/contexts/language-context";
import { orderedResumes } from "@/lib/resumes";

export function ResumeDownloads() {
  const { language, t } = useLanguage();
  const items = orderedResumes(language);

  return (
    <section className="section-panel resume-downloads" id="cv">
      <div className="section-head">
        <p className="living-resume-eyebrow">
          <span className="section-index" aria-hidden="true">
            01
          </span>
          <span>{t("cv.eyebrow")}</span>
        </p>
        <h2>{t("cv.title")}</h2>
        <p>{t("cv.body")}</p>
      </div>

      <div className="cv-download-grid">
        {items.map((item) => {
          const Icon = item.kind === "academic" ? GraduationCap : BriefcaseBusiness;
          return (
            <a
              key={item.id}
              href={item.href}
              download={item.filename}
              className="cv-download-card"
              onClick={() => {
                toast.success(t("cv.downloaded"));
              }}
            >
              <span className="cv-download-icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span className="cv-download-copy">
                <span className="cv-download-meta">
                  <span className="cv-download-badge">PDF · {item.langTag}</span>
                </span>
                <span className="cv-download-title">{t(item.titleKey)}</span>
                <span className="cv-download-description">{t(item.descriptionKey)}</span>
              </span>
              <span className="cv-download-cta">
                <Download size={16} aria-hidden="true" />
                <span>{t("cv.downloadAction")}</span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
