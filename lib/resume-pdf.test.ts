import { describe, expect, it } from "vitest";
import { portfolioSeed } from "@/lib/portfolio-seed";
import { renderResumePdf, resumePdfBlocks, resumePdfFilename } from "@/lib/resume-pdf";

describe("resume pdf", () => {
  it("builds the english curriculum in the reference section order", () => {
    const sections = resumePdfBlocks(portfolioSeed, "en").flatMap((block) =>
      block.kind === "section" ? [block.text] : [],
    );
    expect(sections).toEqual([
      "Research interests",
      "Education",
      "Research experience",
      "Publications",
      "Professional experience",
      "Volunteer experience",
      "Technical skills",
      "Affiliations",
      "Projects",
    ]);
    expect(resumePdfFilename("en")).toBe("Davi-Andrade-CV-en.pdf");
  });

  it("uses the portuguese labels and includes every portfolio project", () => {
    const blocks = resumePdfBlocks(portfolioSeed, "pt");
    const text = JSON.stringify(blocks);
    expect(text).toContain("Experiência profissional");
    expect(text).toContain("Inteligência artificial");
    expect(text).toContain("Redmine");
    expect(text).toContain("Seriesaholic");
    expect(text).toContain("Portal Educação Básica (TCE-PB)");
    expect(text).toContain("Agregador de Portais (TCE-PB)");
    expect(text).toContain("https://portais.tce.pb.gov.br/educacao-basica");
    expect(resumePdfFilename("pt")).toBe("Davi-Andrade-CV-pt.pdf");
  });

  it("renders a pdf document", async () => {
    const bytes = await renderResumePdf(portfolioSeed, "pt");
    expect(Buffer.from(bytes).subarray(0, 5).toString()).toBe("%PDF-");
  });
});
