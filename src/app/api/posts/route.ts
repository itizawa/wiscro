import { getPosts } from "@/shared/lib/post";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 600; // 10分ごとにキャッシュを更新

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);
  const q = searchParams.get("q") ?? undefined;

  const data = await getPosts({ offset, limit, q });

  return NextResponse.json(data);
}
