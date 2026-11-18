"use client";

import { authClient } from "@/lib/auth-client";
import { useLanguage } from "@/lib/contexts/language-context";
import { redirectToAuthLogin } from "@/lib/login-redirect";

export type HeaderUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
};

export function AccountControls({ user }: { user: HeaderUser | null }) {
  const { t } = useLanguage();

  if (!user) {
    return (
      <button type="button" className="header-login" onClick={redirectToAuthLogin}>
        {t("auth.signIn")}
      </button>
    );
  }

  const label = user.name?.trim() || user.email;

  return (
    <div className="header-account">
      <button
        type="button"
        className="header-account-link"
        onClick={() => {
          window.location.assign("/api/auth/handoff");
        }}
      >
        {label}
        <span className="sr-only">. {t("auth.account")}</span>
      </button>
      <button
        type="button"
        className="header-login"
        onClick={() => {
          void authClient.signOut().then(() => {
            window.location.reload();
          });
        }}
      >
        {t("auth.signOut")}
      </button>
    </div>
  );
}
