import type { Metadata } from "next";
import { ContactPageView } from "@/components/contact-page";
import { getCurrentUser } from "@/lib/api/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact | Davi Andrade",
  description:
    "Send a direct message or reach out on WhatsApp for software engineering roles, collaborations, and research.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const user = await getCurrentUser();
  const headerUser = user
    ? {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    : null;

  return <ContactPageView user={headerUser} />;
}
