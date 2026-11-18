import { afterEach, describe, expect, it } from "vitest";
import { appBaseUrlForHost, authHubContactUrl, authHubUrlForHost } from "@/lib/auth-public";

describe("auth urls", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_APP_URL;
    delete process.env.NEXT_PUBLIC_AUTH_URL;
    delete process.env.VERCEL_ENV;
  });

  it("keeps the local app on this port and the hub on the public auth host", () => {
    expect(appBaseUrlForHost("localhost")).toBe("http://localhost:3100");
    expect(authHubUrlForHost("localhost")).toBe("https://auth.daviandrade.dev");
    expect(appBaseUrlForHost("daviandrade.dev")).toBe("https://daviandrade.dev");
  });

  it("ignores a localhost hub url when the request host is public", () => {
    process.env.NEXT_PUBLIC_AUTH_URL = "http://localhost:3200";
    expect(authHubUrlForHost("daviandrade.dev")).toBe("https://auth.daviandrade.dev");
    expect(authHubUrlForHost("localhost")).toBe("http://localhost:3200");
  });

  it("builds the hub contact screen in the selected language", () => {
    expect(authHubContactUrl("en", "daviandrade.dev")).toBe(
      "https://auth.daviandrade.dev/contact?lang=en",
    );
    expect(authHubContactUrl("pt", "localhost")).toBe(
      "https://auth.daviandrade.dev/contact?lang=pt",
    );
    process.env.NEXT_PUBLIC_AUTH_URL = "http://localhost:3200";
    expect(authHubContactUrl("pt", "daviandrade.dev")).toBe(
      "https://auth.daviandrade.dev/contact?lang=pt",
    );
    expect(authHubContactUrl("en", "localhost")).toBe("http://localhost:3200/contact?lang=en");
  });
});
