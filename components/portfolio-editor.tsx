"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { EditorForm, type EditorDialog } from "@/components/edit-forms";
import { useLanguage } from "@/lib/contexts/language-context";
import { redirectToAuthLogin } from "@/lib/login-redirect";
import {
  parsePortfolioDocument,
  type DocumentIssue,
  type PortfolioDocument,
  type ProjectCategory,
  type ResumeBlock,
} from "@/lib/portfolio-document";

type EditorContextValue = {
  document: PortfolioDocument;
  canEdit: boolean;
  editing: boolean;
  saving: boolean;
  status: string | null;
  setEditing: (value: boolean) => void;
  save: () => void;
  cancel: () => void;
  removeById: (key: "projects" | "timeline" | "education" | "skills" | "publications" | "affiliations", id: string) => void;
  openProfile: () => void;
  openProject: (id: string | null, category: ProjectCategory) => void;
  openTimeline: (id: string | null, block: ResumeBlock) => void;
  openEducation: (id: string | null) => void;
  openSkill: (id: string | null) => void;
  openPublication: (id: string | null) => void;
  openAffiliation: (id: string | null) => void;
};

const EditorContext = createContext<EditorContextValue | null>(null);

export function PortfolioEditor({
  initialDocument,
  canEdit,
  children,
}: {
  initialDocument: PortfolioDocument;
  canEdit: boolean;
  children: ReactNode;
}) {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(initialDocument);
  const [draft, setDraft] = useState(initialDocument);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [dialog, setDialog] = useState<EditorDialog | null>(null);

  const apply = useCallback(
    (next: PortfolioDocument) => {
      const parsed = parsePortfolioDocument(next);
      if (!parsed.ok) {
        const message = t(`editor.errors.${parsed.issue}`);
        setStatus(message);
        toast.error(message);
        return;
      }
      setDraft(parsed.document);
      setStatus(null);
      setDialog(null);
    },
    [t],
  );

  const save = useCallback(() => {
    const parsed = parsePortfolioDocument(draft);
    if (!parsed.ok) {
      const message = t(`editor.errors.${parsed.issue}`);
      setStatus(message);
      toast.error(message);
      return;
    }
    setSaving(true);
    setStatus(null);
    void fetch("/api/portfolio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.document),
    })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as
          | { document?: PortfolioDocument; error?: DocumentIssue | "unauthorized" | "unavailable" }
          | null;
        if (response.status === 401) {
          redirectToAuthLogin();
          return;
        }
        if (!response.ok || !payload?.document) {
          const issue = payload?.error ?? "invalid";
          const message = t(`editor.errors.${issue}`);
          setStatus(message);
          toast.error(message);
          return;
        }
        const confirmed = parsePortfolioDocument(payload.document);
        if (!confirmed.ok) {
          const message = t("editor.errors.invalid");
          setStatus(message);
          toast.error(message);
          return;
        }
        setSaved(confirmed.document);
        setDraft(confirmed.document);
        setEditing(false);
        const message = t("editor.saved");
        setStatus(message);
        toast.success(message);
      })
      .catch(() => {
        const message = t("editor.errors.unavailable");
        setStatus(message);
        toast.error(message);
      })
      .finally(() => {
        setSaving(false);
      });
  }, [draft, t]);

  const value = useMemo<EditorContextValue>(
    () => ({
      document: draft,
      canEdit,
      editing: canEdit && editing,
      saving,
      status,
      setEditing: (next) => {
        if (!canEdit) return;
        setEditing(next);
        setStatus(null);
      },
      save,
      cancel: () => {
        setDraft(saved);
        setEditing(false);
        setDialog(null);
        setStatus(null);
      },
      removeById: (key, id) => {
        if (!window.confirm(t("editor.confirmRemove"))) return;
        setDraft((current) => ({
          ...current,
          [key]: current[key].filter((item) => item.id !== id),
        }));
      },
      openProfile: () => setDialog({ kind: "profile" }),
      openProject: (id, category) => setDialog({ kind: "project", id, category }),
      openTimeline: (id, block) => setDialog({ kind: "timeline", id, block }),
      openEducation: (id) => setDialog({ kind: "education", id }),
      openSkill: (id) => setDialog({ kind: "skill", id }),
      openPublication: (id) => setDialog({ kind: "publication", id }),
      openAffiliation: (id) => setDialog({ kind: "affiliation", id }),
    }),
    [canEdit, draft, editing, save, saved, saving, status, t],
  );

  return (
    <EditorContext.Provider value={value}>
      {children}
      {dialog && editing ? (
        <EditorForm
          dialog={dialog}
          document={draft}
          notice={status}
          onClose={() => setDialog(null)}
          onCommit={apply}
        />
      ) : null}
    </EditorContext.Provider>
  );
}

export function useOptionalPortfolioEditor() {
  return useContext(EditorContext);
}

export function usePortfolioEditor() {
  const value = useContext(EditorContext);
  if (!value) {
    throw new Error("usePortfolioEditor must be used within PortfolioEditor");
  }
  return value;
}
