import { RssItem, RssSource } from "../types/rss";

const FEEDS: {
  url: string;
  source: RssSource;
  sourceLabel: string;
}[] = [
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCjW0b3M9L5LPBuDR2w6jzRA",
    source: "youtube",
    sourceLabel: "YouTube",
  },
  {
    url: "https://note.com/ami_wiscro/rss",
    source: "note",
    sourceLabel: "note",
  },
];

const decodeEntities = (text: string): string =>
  text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");

const stripTags = (html: string): string =>
  decodeEntities(html)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const extractTag = (xml: string, tag: string): string | undefined => {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? match[1] : undefined;
};

const extractAttr = (
  xml: string,
  tag: string,
  attr: string,
): string | undefined => {
  const match = xml.match(new RegExp(`<${tag}[^>]*\\s${attr}="([^"]+)"[^>]*\\/?>`));
  return match ? match[1] : undefined;
};

const parseAtom = (
  xml: string,
  source: RssSource,
  sourceLabel: string,
): RssItem[] => {
  const entries = [...xml.matchAll(/<entry[\s\S]*?<\/entry>/g)].map((m) => m[0]);
  return entries.map((entry) => {
    const id = extractTag(entry, "id") ?? "";
    const title = stripTags(extractTag(entry, "title") ?? "");
    const link =
      extractAttr(entry, "link", "href") ??
      stripTags(extractTag(entry, "link") ?? "");
    const publishedAt =
      extractTag(entry, "published") ?? extractTag(entry, "updated") ?? "";
    const mediaGroup = extractTag(entry, "media:group") ?? entry;
    const description = stripTags(
      extractTag(mediaGroup, "media:description") ??
        extractTag(entry, "summary") ??
        "",
    );
    const thumbnail = extractAttr(mediaGroup, "media:thumbnail", "url");
    return {
      id: id || link,
      title,
      link,
      description,
      publishedAt,
      source,
      sourceLabel,
      thumbnail,
    };
  });
};

const parseRss = (
  xml: string,
  source: RssSource,
  sourceLabel: string,
): RssItem[] => {
  const items = [...xml.matchAll(/<item[\s\S]*?<\/item>/g)].map((m) => m[0]);
  return items.map((item) => {
    const title = stripTags(extractTag(item, "title") ?? "");
    const link = stripTags(extractTag(item, "link") ?? "");
    const guid = stripTags(extractTag(item, "guid") ?? "");
    const pubDate = extractTag(item, "pubDate") ?? "";
    const publishedAt = pubDate
      ? new Date(pubDate.trim()).toISOString()
      : "";
    const rawDescription =
      extractTag(item, "description") ?? extractTag(item, "content:encoded") ?? "";
    const description = stripTags(rawDescription).slice(0, 200);
    const mediaThumbnailText = extractTag(item, "media:thumbnail");
    const thumbnail =
      (mediaThumbnailText && stripTags(mediaThumbnailText)) ||
      extractAttr(item, "media:thumbnail", "url") ||
      extractAttr(item, "enclosure", "url") ||
      rawDescription.match(/<img[^>]+src="([^"]+)"/)?.[1];
    return {
      id: guid || link,
      title,
      link,
      description,
      publishedAt,
      source,
      sourceLabel,
      thumbnail,
    };
  });
};

const fetchFeed = async (
  url: string,
  source: RssSource,
  sourceLabel: string,
): Promise<RssItem[]> => {
  const response = await fetch(url, {
    next: { revalidate: 600 },
    headers: { "User-Agent": "wiscro-timeline/1.0" },
  });
  if (!response.ok) return [];
  const xml = await response.text();
  return xml.includes("<entry")
    ? parseAtom(xml, source, sourceLabel)
    : parseRss(xml, source, sourceLabel);
};

export const getTimelineItems = async (): Promise<RssItem[]> => {
  const results = await Promise.all(
    FEEDS.map(({ url, source, sourceLabel }) =>
      fetchFeed(url, source, sourceLabel).catch(() => [] as RssItem[]),
    ),
  );
  return results
    .flat()
    .filter((item) => item.publishedAt)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
};
