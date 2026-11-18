"use client";

import { useSyncExternalStore } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { authHubContactUrl } from "@/lib/auth-public";
import { useLanguage } from "@/lib/contexts/language-context";
import { localized, opensNewTab, type Profile } from "@/lib/portfolio-document";

function subscribeHostname() {
  return () => {};
}

export function ContactPanel({ profile }: { profile: Profile }) {
  const { language, t } = useLanguage();
  const hostname = useSyncExternalStore(subscribeHostname, () => window.location.hostname, () => null);
  const channels = [
    {
      id: "message",
      href: authHubContactUrl(language, hostname),
      label: t("contact.message"),
      value: t("contact.messageHint"),
      icon: Send,
    },
    {
      id: "email",
      href: `mailto:${profile.email}`,
      label: t("contact.email"),
      value: profile.email,
      icon: Mail,
    },
    {
      id: "phone",
      href: profile.phoneHref,
      label: t("contact.phone"),
      value: profile.phone,
      icon: Phone,
    },
    {
      id: "github",
      href: profile.github,
      label: t("contact.github"),
      value: "",
      icon: Github,
    },
    {
      id: "linkedin",
      href: profile.linkedin,
      label: t("contact.linkedin"),
      value: "",
      icon: Linkedin,
    },
  ];

  return (
    <section className="contact-panel" id="contact">
      <div className="contact-layout">
        <div className="contact-intro">
          <p className="contact-eyebrow">{t("contact.eyebrow")}</p>
          <h2>{t("nav.contact")}</h2>
          <p className="contact-body">{t("contact.body")}</p>
          <div className="contact-meta">
            <p className="contact-meta-item">
              <MapPin size={18} aria-hidden="true" />
              <span>{localized(profile.location, language)}</span>
            </p>
          </div>
        </div>
        <div className="contact-grid">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const newTab = opensNewTab(channel.href);
            return (
              <a
                key={channel.id}
                className={`contact-card contact-card-${channel.id}`}
                href={channel.href}
                {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="contact-card-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <span className="contact-card-copy">
                  <span className="contact-card-label">{channel.label}</span>
                  {channel.value ? <span className="contact-card-value">{channel.value}</span> : null}
                  {newTab ? <span className="sr-only"> {t("common.opensInNewTab")}</span> : null}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
