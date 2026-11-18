import { describe, expect, it } from "vitest";
import { hrefIssue, opensNewTab, parsePortfolioDocument, projectsIn } from "@/lib/portfolio-document";
import { portfolioSeed } from "@/lib/portfolio-seed";

describe("portfolio document", () => {
  it("accepts the seeded curriculum and live projects", () => {
    const parsed = parsePortfolioDocument(portfolioSeed);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.document.projects.map((project) => project.href)).toContain(
      "https://seriesaholic.daviandrade.dev",
    );
    expect(JSON.stringify(parsed.document).toLowerCase()).not.toContain(".vercel");
  });

  it("rejects a vercel host", () => {
    const next = structuredClone(portfolioSeed);
    next.projects[0]!.href = "https://workschedule-dd.vercel.app/";
    expect(parsePortfolioDocument(next)).toEqual({ ok: false, issue: "vercel-link" });
    expect(hrefIssue("https://example.vercel.app/app")).toBe("vercel-link");
  });

  it("sorts each project section by the title of the active language", () => {
    const ids = (category: "projects" | "contributions", language: "en" | "pt") =>
      projectsIn(portfolioSeed, category, language).map((project) => project.id);
    const stored = portfolioSeed.projects.map((project) => project.id);

    expect(ids("projects", "en")).toEqual([
      "asebili-instructor",
      "asebili-student",
      "seriesaholic",
      "work-schedule",
    ]);
    expect(ids("projects", "pt")).toEqual([
      "asebili-instructor",
      "asebili-student",
      "work-schedule",
      "seriesaholic",
    ]);
    expect(ids("contributions", "en")).toEqual([
      "tce-portais",
      "tce-educacao-basica",
      "tce",
      "sagres",
      "login",
    ]);
    expect(ids("contributions", "pt")).toEqual([
      "tce-portais",
      "login",
      "tce-educacao-basica",
      "tce",
      "sagres",
    ]);
    expect(portfolioSeed.projects.map((project) => project.id)).toEqual(stored);
  });

  it("opens http links in a new tab and keeps in-page, mail, and phone links here", () => {
    expect(opensNewTab("https://auth.daviandrade.dev/contact?lang=pt")).toBe(true);
    expect(opensNewTab("http://tce.pb.gov.br/")).toBe(true);
    expect(opensNewTab("mailto:daviandrade.dev@gmail.com")).toBe(false);
    expect(opensNewTab("tel:+5583993165070")).toBe(false);
    expect(opensNewTab("#project-tce")).toBe(false);
    expect(opensNewTab("/")).toBe(false);
  });
});
