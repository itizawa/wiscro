import { NextRequest, NextResponse } from "next/server";
import ogs from "open-graph-scraper";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  try {
    const { result } = await ogs({ url });
    return NextResponse.json({
      title: result.ogTitle || null,
      description: result.ogDescription || null,
      image: result.ogImage?.[0]?.url || null,
      favicon: result.favicon || null,
    });
  } catch {
    return NextResponse.json({
      title: url,
      description: null,
      image: null,
      favicon: null,
    });
  }
}
