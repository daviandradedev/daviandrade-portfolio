"use client";

import { ArrowLeft, ArrowUpRight, Check, Copy, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useId, useRef, useState } from "react";
import { toast } from "sonner";
import type { HeaderUser } from "@/components/account-controls";
import { SessionKeepAlive } from "@/components/session-keep-alive";
import { SiteHeader } from "@/components/site-header";
import {
  CONTACT_EMAIL,
  CONTACT_WHATSAPP_NUMBER,
  defaultContactMessage,
  defaultContactSubject,
} from "@/lib/contact";
import { useLanguage } from "@/lib/contexts/language-context";

export function ContactPageView({ user }: { user: HeaderUser | null }) {
  const { t, language } = useLanguage();
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const subjectId = `${formId}-subject`;
  const messageId = `${formId}-message`;
  const statusId = `${formId}-status`;

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleCopyEmail() {
    void navigator.clipboard
      .writeText(CONTACT_EMAIL)
      .then(() => {
        setCopied(true);
        toast.success(t("contact.emailCopied"));
        window.setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error(t("contact.copyFailed"));
      });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    setErrorMsg("");
    setSuccessMsg("");

    const form = new FormData(formEl);
    const subject = String(form.get("subject") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const website = String(form.get("website") ?? "");

    if (!user && !name.trim()) {
      setErrorMsg(t("contact.form.invalidFields"));
      nameRef.current?.focus();
      return;
    }

    if (!user && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg(t("contact.form.invalidEmail"));
      emailRef.current?.focus();
      return;
    }

    if (!subject) {
      setErrorMsg(t("contact.form.invalidFields"));
      subjectRef.current?.focus();
      return;
    }

    if (!message) {
      setErrorMsg(t("contact.form.invalidFields"));
      messageRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          website,
          language,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        const msg =
          payload?.error === "INVALID_FIELDS"
            ? t("contact.form.invalidFields")
            : payload?.error === "EMAIL_NOT_CONFIGURED"
              ? t("contact.form.sendNotConfigured")
              : payload?.error === "RATE_LIMITED"
                ? t("contact.form.rateLimited")
                : t("contact.form.sendFailed");
        setErrorMsg(msg);
        toast.error(msg);
        return;
      }

      const sent = t("contact.form.sent");
      setErrorMsg("");
      setSuccessMsg(sent);
      toast.success(sent);
      formEl.reset();
    } catch {
      const failed = t("contact.form.sendFailed");
      setSuccessMsg("");
      setErrorMsg(failed);
      toast.error(failed);
    } finally {
      setLoading(false);
    }
  }

  const whatsappHref = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    defaultContactMessage(language),
  )}`;

  return (
    <>
      {user ? <SessionKeepAlive /> : null}
      <SiteHeader user={user} activeRoute="/contact" />
      <main className="page-shell contact-page-shell" id="main-content" tabIndex={-1}>
        <div className="contact-page-nav">
          <Link href="/" className="contact-back-link">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>{t("contact.form.backToPortfolio")}</span>
          </Link>
        </div>

        <div className="contact-page-grid">
          <div className="contact-page-aside">
            <p className="contact-eyebrow">{t("contact.eyebrow")}</p>
            <h1 className="contact-page-title">{t("contact.form.title")}</h1>
            <p className="contact-body">{t("contact.form.subtitle")}</p>

            <div className="contact-page-meta">
              <p className="contact-meta-item">
                <MapPin size={16} aria-hidden="true" />
                <span>{t("hero.eyebrow")}</span>
              </p>
              <button type="button" className="contact-copy-button" onClick={handleCopyEmail}>
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                <span>{copied ? t("contact.emailCopied") : `${t("contact.copyEmail")} · ${CONTACT_EMAIL}`}</span>
              </button>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp-card"
              aria-label={`${t("contact.form.whatsappTitle")}. ${t("contact.form.whatsappDesc")}. ${t("common.opensInNewTab")}`}
            >
              <div className="contact-whatsapp-copy">
                <p className="contact-whatsapp-eyebrow">{t("contact.form.whatsappEyebrow")}</p>
                <h2 className="contact-whatsapp-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  <span>{t("contact.form.whatsappTitle")}</span>
                </h2>
                <p className="contact-whatsapp-desc">{t("contact.form.whatsappDesc")}</p>
              </div>
              <ArrowUpRight size={18} className="contact-whatsapp-arrow" aria-hidden="true" />
            </a>
          </div>

          <section className="contact-form-card" aria-labelledby={`${formId}-heading`}>
            <div className="contact-form-head">
              <h2 id={`${formId}-heading`} className="contact-form-heading">
                {t("contact.message")}
              </h2>
              <p className="contact-form-to">
                {t("contact.form.toLabel")} <strong>{CONTACT_EMAIL}</strong>
              </p>
            </div>

            <form className="contact-form-stack" onSubmit={(event) => void handleSubmit(event)} noValidate>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor={nameId} className="contact-label">
                    {t("contact.form.fullName")}
                  </label>
                  <input
                    ref={nameRef}
                    id={nameId}
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required={!user || undefined}
                    className="contact-input"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor={emailId} className="contact-label">
                    <span>{t("contact.form.replyEmail")}</span>
                    <span className="contact-label-hint">{t("contact.form.replyEmailHint")}</span>
                  </label>
                  <input
                    ref={emailRef}
                    id={emailId}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    readOnly={Boolean(user) || undefined}
                    required={!user || undefined}
                    className="contact-input"
                  />
                </div>
              </div>

              <div key={language} className="contact-field">
                <label htmlFor={subjectId} className="contact-label">
                  {t("contact.form.subject")}
                </label>
                <input
                  ref={subjectRef}
                  id={subjectId}
                  name="subject"
                  type="text"
                  defaultValue={defaultContactSubject(language)}
                  required
                  className="contact-input"
                />
              </div>

              <div key={`${language}-message`} className="contact-field">
                <label htmlFor={messageId} className="contact-label">
                  {t("contact.form.message")}
                </label>
                <textarea
                  ref={messageRef}
                  id={messageId}
                  name="message"
                  defaultValue={defaultContactMessage(language)}
                  required
                  rows={5}
                  className="contact-input contact-textarea"
                />
              </div>

              <div className="sr-only" aria-hidden="true">
                <label htmlFor={`${formId}-website`}>Website</label>
                <input
                  id={`${formId}-website`}
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {errorMsg ? (
                <p id={statusId} role="alert" className="contact-status contact-status-error">
                  {errorMsg}
                </p>
              ) : successMsg ? (
                <p id={statusId} role="status" className="contact-status contact-status-success">
                  {successMsg}
                </p>
              ) : null}

              <button
                type="submit"
                className="contact-submit"
                disabled={loading || undefined}
                aria-busy={loading || undefined}
              >
                <Send size={15} aria-hidden="true" />
                <span>{loading ? t("contact.form.sending") : t("contact.form.send")}</span>
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
