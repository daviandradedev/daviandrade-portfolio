import { portfolioSeed } from "@/lib/portfolio-seed";
import { parsePortfolioDocument, type PortfolioDocument } from "@/lib/portfolio-document";
import { getPool } from "@/lib/db";

const ROW_ID = "published";

async function ensureTable() {
  const pool = getPool();
  if (!pool) return null;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_document (
      id text PRIMARY KEY,
      body jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `);
  return pool;
}

export async function readPublishedDocument(): Promise<PortfolioDocument> {
  try {
    const pool = await ensureTable();
    if (!pool) return portfolioSeed;
    const result = await pool.query<{ body: unknown }>(
      "SELECT body FROM portfolio_document WHERE id = $1",
      [ROW_ID],
    );
    const body = result.rows[0]?.body;
    if (!body) return portfolioSeed;
    const parsed = parsePortfolioDocument(body);
    return parsed.ok ? parsed.document : portfolioSeed;
  } catch {
    return portfolioSeed;
  }
}

export async function writePublishedDocument(document: PortfolioDocument) {
  const pool = await ensureTable();
  if (!pool) {
    const error = new Error("unavailable");
    error.name = "PortfolioStoreError";
    throw error;
  }
  await pool.query(
    `INSERT INTO portfolio_document (id, body, updated_at)
     VALUES ($1, $2::jsonb, now())
     ON CONFLICT (id) DO UPDATE SET body = EXCLUDED.body, updated_at = now()`,
    [ROW_ID, JSON.stringify(document)],
  );
  return document;
}
