import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { orderedResumes, RESUME_DOCUMENTS } from "@/lib/resumes";

describe("curated resume catalog", () => {
  it("prioritizes the active language first while keeping all four PDFs", () => {
    expect(orderedResumes("pt").map((item) => item.id)).toEqual([
      "academic-pt",
      "professional-pt",
      "academic-en",
      "professional-en",
    ]);
    expect(orderedResumes("en").map((item) => item.id)).toEqual([
      "academic-en",
      "professional-en",
      "academic-pt",
      "professional-pt",
    ]);
  });

  it("references valid non-empty PDF files inside public/resume", () => {
    for (const item of RESUME_DOCUMENTS) {
      expect(item.href).toBe(`/resume/${item.filename}`);
      const absolutePath = path.join(process.cwd(), "public", item.href);
      const buffer = readFileSync(absolutePath);
      expect(buffer.byteLength).toBeGreaterThan(1024);
      expect(buffer.subarray(0, 5).toString("ascii")).toBe("%PDF-");
    }
  });
});
