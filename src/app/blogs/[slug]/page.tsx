import { MarkdownViewer } from "@/components/MarkdownViewer";
import { getAllBlogIds, getBlogById } from "@/shared/lib/blog_v2";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
import { htmlToMarkdown } from "@/shared/lib/markdown";
import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const ids = await getAllBlogIds();
  return ids.map((slug) => ({ slug }));
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogById(slug);

  if (!post) {
    return generateMetadataObject();
  }

  return generateMetadataObject({
    title: `${post.title} | wiscro`,
    images: post.category?.icon?.url ? [post.category.icon.url] : undefined,
    description: post.summary,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogById(slug);

  if (!post) notFound();

  return (
    <Box component="main" sx={{ minHeight: "100vh", py: 4 }}>
      <Box sx={{ maxWidth: "1152px", mx: "auto", px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box sx={{ mb: 3 }}>
          <Link
            href="/blogs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "#1565c0",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            ← 一覧に戻る
          </Link>
        </Box>
        <Box
          component="article"
          sx={{ maxWidth: "896px", mx: "auto", display: "flex", flexDirection: "column", gap: 4 }}
        >
          <Box
            component="header"
            sx={{
              borderBottom: "1px solid #e5e7eb",
              my: 2,
              pb: 2.5,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Image
              src={post.category.icon.url}
              alt={post.title}
              width={80}
              height={80}
              style={{ width: 80, height: 80 }}
            />
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#111827" }}>
              {post.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "#4b5563" }}>
              <Typography variant="body2">
                <time>{formatDate(post.publishedAt)}</time>
              </Typography>
            </Box>
          </Box>
          <MarkdownViewer body={htmlToMarkdown(post.content)} />
        </Box>
      </Box>
    </Box>
  );
}
