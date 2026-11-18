import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __portfolioPool?: Pool;
};

export function getPool() {
  const connectionString = process.env.AUTH_DATABASE_URL?.trim();
  if (!connectionString) return null;
  if (!globalForDb.__portfolioPool) {
    globalForDb.__portfolioPool = new Pool({ connectionString, max: 5 });
  }
  return globalForDb.__portfolioPool;
}
