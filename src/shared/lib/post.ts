import { client } from "./blog_v2";
import { Post } from "../types/post";

export interface PostListResponse {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
}

export async function getPosts({
  offset = 0,
  limit = 20,
  q,
}: {
  offset?: number;
  limit?: number;
  q?: string;
} = {}): Promise<PostListResponse> {
  const data = await client.get<PostListResponse>({
    endpoint: "posts",
    queries: {
      fields: "id,body,images,publishedAt,createdAt,updatedAt",
      limit,
      offset,
      orders: "-publishedAt",
      ...(q && { q }),
    },
  });
  return data;
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const data = await client.get<Post>({
      endpoint: "posts",
      contentId: id,
    });
    return data ?? null;
  } catch {
    return null;
  }
}
