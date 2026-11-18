const DEFAULT_OWNER = "daviandrade.dev@gmail.com";

export function ownerEmail() {
  return (process.env.PORTFOLIO_OWNER_EMAIL ?? DEFAULT_OWNER).trim().toLowerCase();
}

export function isOwner(user: { id?: string | null; email?: string | null } | null) {
  if (!user) return false;
  const owner = ownerEmail();
  const email = user.email?.trim().toLowerCase();
  const id = user.id?.trim().toLowerCase();
  return email === owner || id === owner;
}
