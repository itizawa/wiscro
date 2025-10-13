// libs/microcms.ts
import { createClient } from "microcms-js-sdk";
import { Blog } from "../types/blog";

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// Client SDKの初期化を行う
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export async function getAllBlogPosts({ limit }: { limit?: number } = {}) {
  const data = await client.get<{ contents: Blog[] }>({
    endpoint: "blogs",
    queries: {
      // タイムライン表示に必要な最低限のフィールド
      fields:
        "id,title,content,eyecatch,category,publishedAt,createdAt,updatedAt",
      limit: limit ?? 5, // 最新の5件を取得
    },
  });
  return data.contents;
}
