import TurndownService from "turndown";

// HTML を Markdown に変換するユーティリティ
const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

// MicroCMS からの HTML を Markdown に正規化して返す
export function htmlToMarkdown(html: string): string {
  if (!html) return "";
  return turndown.turndown(html);
}

// 既存 API 互換（Markdown をそのまま返す）
export function parseMarkdown(content: string): string {
  return content;
}
