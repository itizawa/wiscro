import { getPosts } from "@/shared/lib/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);
  const labelId = searchParams.get("labelId") ?? undefined;

  const data = await getPosts({ offset, limit, labelId });

  return NextResponse.json(data);
}
