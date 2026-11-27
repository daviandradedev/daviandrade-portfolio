import { describe, expect, it } from "vitest";
import { translate, translateList, translationPaths } from "@/lib/i18n";

describe("i18n dictionary", () => {
  it("keeps identical translation key trees across English and Portuguese", () => {
    const enPaths = translationPaths("en");
    const ptPaths = translationPaths("pt");

    expect(enPaths).toEqual(ptPaths);
    expect(enPaths.length).toBeGreaterThan(80);
  });

  it("provides non-empty strings without em-dashes in both languages", () => {
    for (const path of translationPaths("en")) {
      const enList = translateList("en", path);
      if (enList.length > 0) {
        const ptList = translateList("pt", path);
        expect(ptList.length).toBe(enList.length);
        for (const value of [...enList, ...ptList]) {
          expect(value.trim().length).toBeGreaterThan(0);
          expect(value).not.toContain("—");
        }
        continue;
      }

      const en = translate("en", path);
      const pt = translate("pt", path);
      expect(en).not.toBe(path);
      expect(pt).not.toBe(path);
      expect(en.trim().length).toBeGreaterThan(0);
      expect(pt.trim().length).toBeGreaterThan(0);
      expect(en).not.toContain("—");
      expect(pt).not.toContain("—");
    }
  });
});
