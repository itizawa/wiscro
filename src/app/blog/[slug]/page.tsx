import { BlogPost } from "@/components/blog/BlogPost";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getBlogPostWithHtmlBySlug,
} from "@/shared/lib/blog";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
import { Box } from "@mui/material";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return generateMetadataObject();
  }

  return generateMetadataObject({
    title: `${post.title} | wiscro`,
    description: post.summary,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostWithHtmlBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Box component="main" sx={{ minHeight: "100vh", py: 4 }}>
      <Box sx={{ maxWidth: "1152px", mx: "auto", px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box sx={{ mb: 3 }}>
          <Link
            href="/blog"
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
        <BlogPost post={post} />
      </Box>
    </Box>
  );
}
