import { afterEach, describe, expect, it } from "vitest";
import { isOwner, ownerEmail } from "@/lib/owner";

describe("owner", () => {
  afterEach(() => {
    delete process.env.PORTFOLIO_OWNER_EMAIL;
  });

  it("matches the portfolio account by email or id", () => {
    expect(ownerEmail()).toBe("daviandrade.dev@gmail.com");
    expect(isOwner({ email: "Daviandrade.dev@gmail.com", id: "other" })).toBe(true);
    expect(isOwner({ email: "other@example.com", id: "daviandrade.dev@gmail.com" })).toBe(true);
    expect(isOwner({ email: "other@example.com", id: "other@example.com" })).toBe(false);
    expect(isOwner(null)).toBe(false);
  });
});
