"use client";

import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/contexts/language-context";
import { localized, opensNewTab, type Profile } from "@/lib/portfolio-document";

export function ContactPanel({ profile }: { profile: Profile }) {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const channels = [
    {
      id: "message",
      href: "/contact",
      label: t("contact.message"),
      value: t("contact.messageHint"),
      icon: Send,
      featured: true,
    },
    {
      id: "email",
      href: `mailto:${profile.email}`,
      label: t("contact.email"),
      value: profile.email,
      icon: Mail,
      featured: false,
    },
    {
      id: "phone",
      href: profile.phoneHref,
      label: t("contact.phone"),
      value: profile.phone,
      icon: Phone,
      featured: false,
    },
    {
      id: "github",
      href: profile.github,
      label: t("contact.github"),
      value: "github.com/daviandradedev",
      icon: Github,
      featured: false,
    },
    {
      id: "linkedin",
      href: profile.linkedin,
      label: t("contact.linkedin"),
      value: "linkedin.com/in/daviandradedev",
      icon: Linkedin,
      featured: false,
    },
  ];

  const handleCopyEmail = () => {
    void navigator.clipboard
      .writeText(profile.email)
      .then(() => {
        setCopied(true);
        toast.success(t("contact.emailCopied"));
        window.setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error(t("contact.copyFailed"));
      });
  };

  return (
    <section className="contact-panel" id="contact">
      <div className="contact-layout">
        <div className="contact-intro">
          <p className="contact-eyebrow">
            <span className="section-index" aria-hidden="true">
              07
            </span>
            <span>{t("contact.eyebrow")}</span>
          </p>
          <h2>{t("nav.contact")}</h2>
          <p className="contact-body">{t("contact.body")}</p>
          <div className="contact-meta">
            <p className="contact-meta-item">
              <MapPin size={17} aria-hidden="true" />
              <span>{localized(profile.location, language)}</span>
            </p>
          </div>
          <button
            type="button"
            className="contact-copy-button"
            onClick={handleCopyEmail}
          >
            {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
            <span>{copied ? t("contact.emailCopied") : `${t("contact.copyEmail")} · ${profile.email}`}</span>
          </button>
        </div>

        <div className="contact-grid">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const newTab = opensNewTab(channel.href);
            const className = `contact-card contact-card-${channel.id}${channel.featured ? " contact-card-featured" : ""}`;
            const inner = (
              <>
                <span className="contact-card-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span className="contact-card-copy">
                  <span className="contact-card-label">{channel.label}</span>
                  {channel.value ? <span className="contact-card-value">{channel.value}</span> : null}
                  {newTab ? <span className="sr-only"> {t("common.opensInNewTab")}</span> : null}
                </span>
                <ArrowUpRight size={16} className="contact-card-arrow" aria-hidden="true" />
              </>
            );
            if (channel.href.startsWith("/")) {
              return (
                <Link key={channel.id} className={className} href={channel.href}>
                  {inner}
                </Link>
              );
            }
            return (
              <a
                key={channel.id}
                className={className}
                href={channel.href}
                {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {inner}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
