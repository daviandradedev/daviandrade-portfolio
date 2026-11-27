"use client";

import { AlertTriangle, Compass, Home, Mail, RefreshCw } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/lib/contexts/language-context";

type SystemStatusViewProps = {
  kind: "notFound" | "error";
  digest?: string;
  onRetry?: () => void;
};

export function SystemStatusView({ kind, digest, onRetry }: SystemStatusViewProps) {
  const { t } = useLanguage();
  const isError = kind === "error";

  return (
    <>
      <SiteHeader user={null} activeRoute={isError ? "/error" : "/404"} />
      <main className="page-shell system-status-shell" id="main-content" tabIndex={-1}>
        <section className="system-status-card" aria-labelledby="system-status-title">
          <div className="system-status-icon" aria-hidden="true">
            {isError ? <AlertTriangle size={26} /> : <Compass size={26} />}
          </div>
          <p className="system-status-code">{isError ? "500" : "404"}</p>
          <h1 id="system-status-title" className="system-status-title">
            {t(isError ? "system.errorTitle" : "system.notFoundTitle")}
          </h1>
          <p className="system-status-desc">
            {t(isError ? "system.errorDesc" : "system.notFoundDesc")}
          </p>
          {digest ? (
            <p className="system-status-digest">
              <span>{t("system.reference")}:</span> <code>{digest}</code>
            </p>
          ) : null}
          <div className="system-status-actions">
            {isError && onRetry ? (
              <button type="button" className="contact-submit" onClick={onRetry}>
                <RefreshCw size={15} aria-hidden="true" />
                <span>{t("system.tryAgain")}</span>
              </button>
            ) : (
              <Link href="/" className="contact-submit">
                <Home size={15} aria-hidden="true" />
                <span>{t("system.backHome")}</span>
              </Link>
            )}
            {isError ? (
              <Link href="/" className="contact-back-link">
                <Home size={15} aria-hidden="true" />
                <span>{t("system.backHome")}</span>
              </Link>
            ) : (
              <Link href="/contact" className="contact-back-link">
                <Mail size={15} aria-hidden="true" />
                <span>{t("nav.contact")}</span>
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
