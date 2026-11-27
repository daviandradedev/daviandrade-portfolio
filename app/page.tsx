import { HomePage } from "@/components/home-page";
import { getCurrentUser } from "@/lib/api/auth";
import { isOwner } from "@/lib/owner";
import { readPublishedDocument } from "@/lib/portfolio-store";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [document, user] = await Promise.all([readPublishedDocument(), getCurrentUser()]);

  return (
    <HomePage
      initialDocument={document}
      canEdit={isOwner(user)}
      user={
        user
          ? {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            }
          : null
      }
    />
  );
}
