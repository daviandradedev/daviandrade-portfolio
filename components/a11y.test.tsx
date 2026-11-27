import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { createElement, type ImgHTMLAttributes, type ReactNode } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { ContactPageView } from "@/components/contact-page";
import { HomePage } from "@/components/home-page";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/skip-link";
import { portfolioSeed } from "@/lib/portfolio-seed";

vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    priority: _priority,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    void _fill;
    void _priority;
    return createElement("img", { alt: props.alt ?? "", ...props });
  },
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => {
  cleanup();
});

describe("portfolio accessibility and interactions", () => {
  it("renders the full home shell without axe accessibility violations", async () => {
    const { container } = render(
      <Providers>
        <div className="app-shell">
          <SkipLink />
          <HomePage initialDocument={portfolioSeed} user={null} canEdit={false} />
          <SiteFooter />
        </div>
      </Providers>,
    );

    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });
    expect(results.violations).toEqual([]);
  });

  it("renders all four downloadable resume PDFs above the living resume", () => {
    render(
      <Providers>
        <HomePage initialDocument={portfolioSeed} user={null} canEdit={false} />
      </Providers>,
    );

    const downloadLinks = screen
      .getAllByRole("link")
      .filter((link) => link.hasAttribute("download"));

    expect(downloadLinks).toHaveLength(4);
    expect(
      downloadLinks.map((link) => link.getAttribute("href")),
    ).toEqual([
      "/resume/Davi-Andrade-Academic-CV-EN.pdf",
      "/resume/Davi-Andrade-Professional-Resume-EN.pdf",
      "/resume/Davi-Andrade-Curriculo-Academico-PT.pdf",
      "/resume/Davi-Andrade-Curriculo-Profissional-PT.pdf",
    ]);
    expect(screen.queryByRole("button", { name: /Download PDF/i })).toBeNull();
  });

  it("filters the living resume timeline via accessible tabs", () => {
    render(
      <Providers>
        <HomePage initialDocument={portfolioSeed} user={null} canEdit={false} />
      </Providers>,
    );

    const researchTab = screen.getByRole("tab", { name: /Research/i });
    fireEvent.click(researchTab);

    expect(researchTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText("Undergraduate Researcher")).toBeTruthy();
    expect(screen.queryByText("Maxima Solutions")).toBeNull();
  });

  it("renders the public contact page without axe accessibility violations", async () => {
    const { container } = render(
      <Providers>
        <div className="app-shell">
          <SkipLink />
          <ContactPageView user={null} />
          <SiteFooter />
        </div>
      </Providers>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Get in touch" })).toBeTruthy();
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });
    expect(results.violations).toEqual([]);
  });
});
