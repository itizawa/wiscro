import { client } from "./blog_v2";
import { Post, PostLabel } from "../types/post";

export interface PostListResponse {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
}

export async function getPosts({
  offset = 0,
  limit = 20,
  labelId,
}: {
  offset?: number;
  limit?: number;
  labelId?: string;
} = {}): Promise<PostListResponse> {
  const filters = labelId ? `label[equals]${labelId}` : undefined;
  const data = await client.get<PostListResponse>({
    endpoint: "posts",
    queries: {
      fields: "id,body,images,label,publishedAt,createdAt,updatedAt",
      limit,
      offset,
      orders: "-publishedAt",
      ...(filters && { filters }),
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

export async function getPostLabels(): Promise<PostLabel[]> {
  try {
    const data = await client.get<{ contents: PostLabel[] }>({
      endpoint: "post-labels",
      queries: {
        fields: "id,name,color",
        limit: 100,
      },
    });
    return data.contents;
  } catch {
    return [];
  }
}
