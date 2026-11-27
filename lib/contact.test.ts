import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildContactEmailBody,
  defaultContactMessage,
  defaultContactSubject,
  deliverContactEmail,
  isLikelyBot,
  resolveContactSender,
} from "@/lib/contact";
import { EmailDeliveryError } from "@/lib/mail/resend";

vi.mock("@/lib/mail/resend", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/mail/resend")>();
  return {
    ...actual,
    sendTransactionalEmail: vi.fn(),
  };
});

import { sendTransactionalEmail } from "@/lib/mail/resend";

describe("contact copy and delivery", () => {
  it("defaults subject and message in both languages", () => {
    expect(defaultContactSubject("pt")).toBe("Contato");
    expect(defaultContactSubject("en")).toBe("Contact");
    expect(defaultContactMessage("pt")).toContain("Olá Davi");
  });

  it("builds pt and en email bodies", () => {
    const pt = buildContactEmailBody({
      name: "Ana",
      replyEmail: "ana@example.com",
      message: "Oi",
      language: "pt",
    });
    expect(pt).toContain("Nome: Ana");
    expect(pt).toContain("Oi");
    expect(pt).toContain("daviandrade.dev");

    const en = buildContactEmailBody({
      name: "",
      replyEmail: "x@y.com",
      message: "",
      language: "en",
    });
    expect(en).toContain("(not provided)");
    expect(en).toContain(defaultContactMessage("en"));
  });

  beforeEach(() => {
    vi.mocked(sendTransactionalEmail).mockReset();
  });

  it("delegates to transactional mail and maps delivery errors", async () => {
    await deliverContactEmail({ subject: "S", text: "T", replyTo: "a@b.com" });
    expect(sendTransactionalEmail).toHaveBeenCalledOnce();

    vi.mocked(sendTransactionalEmail).mockRejectedValue(new EmailDeliveryError("SEND_FAILED"));
    await expect(
      deliverContactEmail({ subject: "S", text: "T", replyTo: "a@b.com" }),
    ).rejects.toThrow("SEND_FAILED");
  });

  it("resolves signed-in and visitor senders safely", () => {
    expect(
      resolveContactSender({ name: "Ana", email: " Ana@Example.com " }, { email: "other@x.com" }),
    ).toEqual({
      ok: true,
      name: "Ana",
      replyEmail: "ana@example.com",
      signedIn: true,
    });

    expect(resolveContactSender(null, { name: " Bia ", email: "Bia@Example.com" })).toEqual({
      ok: true,
      name: "Bia",
      replyEmail: "bia@example.com",
      signedIn: false,
    });

    expect(resolveContactSender(null, { name: "", email: "bia@example.com" })).toEqual({ ok: false });
    expect(resolveContactSender(undefined, { name: "Bia", email: "invalid" })).toEqual({ ok: false });
  });

  it("detects filled honeypot submissions", () => {
    expect(isLikelyBot({ website: "https://spam.example" })).toBe(true);
    expect(isLikelyBot({ website: "  " })).toBe(false);
    expect(isLikelyBot({})).toBe(false);
  });
});
