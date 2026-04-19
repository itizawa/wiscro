export type RssSource = "youtube" | "note";

export interface RssItem {
  id: string;
  title: string;
  link: string;
  description: string;
  publishedAt: string;
  source: RssSource;
  sourceLabel: string;
  thumbnail?: string;
}
