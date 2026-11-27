"use client";

import { Command } from "cmdk";
import {
  ArrowUpRight,
  Copy,
  Download,
  ExternalLink,
  FileText,
  FolderKanban,
  Globe,
  Mail,
  Moon,
  Pencil,
  Search,
  Sparkles,
  Sun,
} from "lucide-react";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { usePortfolioEditor } from "@/components/portfolio-editor";
import { useLanguage } from "@/lib/contexts/language-context";
import { useTheme } from "@/lib/hooks/use-theme";
import { localized } from "@/lib/portfolio-document";

type CommandMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const editor = usePortfolioEditor();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange, open]);

  const jumpTo = useCallback(
    (hash: string) => {
      onOpenChange(false);
      const target = document.querySelector(hash);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.history.replaceState(null, "", hash);
    },
    [onOpenChange],
  );

  const runAction = useCallback(
    (action: () => void) => {
      onOpenChange(false);
      action();
    },
    [onOpenChange],
  );

  const sections = [
    { id: "#cv", label: t("nav.cv") },
    { id: "#resume", label: t("nav.livingResume") },
    { id: "#projects", label: t("nav.projects") },
    { id: "#ongoing", label: t("nav.ongoing") },
    { id: "#contributions", label: t("nav.contributions") },
    { id: "#internal", label: t("nav.internal") },
    { id: "#contact", label: t("nav.contact") },
  ];

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label={t("command.label")}
      className="cmdk-dialog"
      overlayClassName="cmdk-overlay"
      contentClassName="cmdk-content"
    >
      <div className="cmdk-input-row">
        <Search size={16} className="cmdk-search-icon" aria-hidden="true" />
        <Command.Input
          className="cmdk-input"
          placeholder={t("command.placeholder")}
        />
        <kbd className="cmdk-kbd">ESC</kbd>
      </div>

      <Command.List className="cmdk-list">
        <Command.Empty className="cmdk-empty">{t("command.empty")}</Command.Empty>

        <Command.Group heading={t("command.groups.navigation")} className="cmdk-group">
          {sections.map((section) => (
            <Command.Item
              key={section.id}
              value={`section ${section.label}`}
              onSelect={() => jumpTo(section.id)}
              className="cmdk-item"
            >
              <FileText size={15} aria-hidden="true" />
              <span>{section.label}</span>
              <span className="cmdk-hint">{section.id}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading={t("command.groups.projects")} className="cmdk-group">
          {editor.document.projects.map((project) => {
            const title = localized(project.title, language);
            const highlights = project.highlights
              .map((item) => localized(item, language))
              .join(" ");
            return (
              <Command.Item
                key={project.id}
                value={`${title} ${highlights}`}
                onSelect={() => jumpTo(`#project-${project.id}`)}
                className="cmdk-item"
              >
                <FolderKanban size={15} aria-hidden="true" />
                <span>{title}</span>
                {project.href ? (
                  <ExternalLink size={14} className="cmdk-trailing" aria-hidden="true" />
                ) : null}
              </Command.Item>
            );
          })}
        </Command.Group>

        <Command.Group heading={t("command.groups.actions")} className="cmdk-group">
          <Command.Item
            value={t("command.actions.downloadPdf")}
            onSelect={() => jumpTo("#cv")}
            className="cmdk-item"
          >
            <Download size={15} aria-hidden="true" />
            <span>{t("command.actions.downloadPdf")}</span>
            <span className="cmdk-hint">#cv</span>
          </Command.Item>

          <Command.Item
            value={t("command.actions.copyEmail")}
            onSelect={() =>
              runAction(() => {
                void navigator.clipboard
                  .writeText(editor.document.profile.email)
                  .then(() => {
                    toast.success(t("contact.emailCopied"));
                  })
                  .catch(() => {
                    toast.error(t("contact.copyFailed"));
                  });
              })
            }
            className="cmdk-item"
          >
            <Copy size={15} aria-hidden="true" />
            <span>{t("command.actions.copyEmail")}</span>
            <span className="cmdk-hint">{editor.document.profile.email}</span>
          </Command.Item>

          <Command.Item
            value={t("command.actions.toggleTheme")}
            onSelect={() => runAction(toggleTheme)}
            className="cmdk-item"
          >
            {theme === "dark" ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
            <span>{t("command.actions.toggleTheme")}</span>
          </Command.Item>

          <Command.Item
            value={t("command.actions.toggleLanguage")}
            onSelect={() =>
              runAction(() => setLanguage(language === "pt" ? "en" : "pt"))
            }
            className="cmdk-item"
          >
            <Globe size={15} aria-hidden="true" />
            <span>{t("command.actions.toggleLanguage")}</span>
            <span className="cmdk-hint">{language === "pt" ? "EN" : "PT"}</span>
          </Command.Item>

          <Command.Item
            value={t("command.actions.openLattes")}
            onSelect={() =>
              runAction(() => {
                window.open(editor.document.profile.lattes, "_blank", "noopener,noreferrer");
              })
            }
            className="cmdk-item"
          >
            <ArrowUpRight size={15} aria-hidden="true" />
            <span>{t("command.actions.openLattes")}</span>
          </Command.Item>

          <Command.Item
            value={t("contact.message")}
            onSelect={() =>
              runAction(() => {
                window.location.assign("/contact");
              })
            }
            className="cmdk-item"
          >
            <Mail size={15} aria-hidden="true" />
            <span>{t("contact.message")}</span>
            <span className="cmdk-hint">/contact</span>
          </Command.Item>

          {editor.canEdit ? (
            <Command.Item
              value={t("command.actions.editPortfolio")}
              onSelect={() => runAction(() => editor.setEditing(!editor.editing))}
              className="cmdk-item"
            >
              {editor.editing ? <Sparkles size={15} aria-hidden="true" /> : <Pencil size={15} aria-hidden="true" />}
              <span>{t("command.actions.editPortfolio")}</span>
            </Command.Item>
          ) : null}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
