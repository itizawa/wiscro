import { getSql } from "./db";
import { RssItem, RssSource } from "../types/rss";

type Row = {
  id: string;
  source: string;
  source_label: string;
  title: string;
  link: string;
  description: string;
  thumbnail: string | null;
  published_at: Date | string;
};

const rowToItem = (row: Row): RssItem => ({
  id: row.id,
  source: row.source as RssSource,
  sourceLabel: row.source_label,
  title: row.title,
  link: row.link,
  description: row.description,
  thumbnail: row.thumbnail ?? undefined,
  publishedAt:
    row.published_at instanceof Date
      ? row.published_at.toISOString()
      : new Date(row.published_at).toISOString(),
});

export const selectTimeline = async (limit = 50): Promise<RssItem[]> => {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, source, source_label, title, link, description, thumbnail, published_at
    FROM timeline_items
    ORDER BY published_at DESC
    LIMIT ${limit}
  `) as Row[];
  return rows.map(rowToItem);
};

export const upsertTimelineItems = async (
  items: RssItem[],
): Promise<number> => {
  if (items.length === 0) return 0;
  const sql = getSql();
  let affected = 0;
  for (const item of items) {
    await sql`
      INSERT INTO timeline_items
        (id, source, source_label, title, link, description, thumbnail, published_at, updated_at)
      VALUES
        (${item.id}, ${item.source}, ${item.sourceLabel}, ${item.title}, ${item.link},
         ${item.description}, ${item.thumbnail ?? null}, ${item.publishedAt}, NOW())
      ON CONFLICT (id) DO UPDATE SET
        source = EXCLUDED.source,
        source_label = EXCLUDED.source_label,
        title = EXCLUDED.title,
        link = EXCLUDED.link,
        description = EXCLUDED.description,
        thumbnail = EXCLUDED.thumbnail,
        published_at = EXCLUDED.published_at,
        updated_at = NOW()
    `;
    affected += 1;
  }
  return affected;
};
