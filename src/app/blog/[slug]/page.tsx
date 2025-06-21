import { BlogPost } from "@/components/blog/BlogPost";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getBlogPostWithHtmlBySlug,
} from "@/shared/lib/blog";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
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
    <main
      className="min-h-screen py-8"
      style={{
        backgroundImage: `linear-gradient(45deg, rgb(139 208 254 / 30%), rgba(0, 123, 255, 0))`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium"
          >
            ← 一覧に戻る
          </Link>
        </div>
        <BlogPost post={post} />
      </div>
    </main>
  );
}
