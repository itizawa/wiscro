import { MarkdownViewer } from "@/components/MarkdownViewer";
import { getAllBlogIds, getBlogById } from "@/shared/lib/blog_v2";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
import { htmlToMarkdown } from "@/shared/lib/markdown";
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
    images: [post.eyecatch.url],
    description: post.summary,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogById(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium"
          >
            ← 一覧に戻る
          </Link>
        </div>
        <article className="max-w-4xl mx-auto space-y-8">
          <header className="mb-5">
            {post.eyecatch.url && (
              <div className="mb-8">
                <Image
                  src={post.eyecatch.url}
                  alt={post.title}
                  width={800}
                  height={256}
                  className="w-full h-64 object-cover md:object-contain rounded-lg"
                />
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <time>{formatDate(post.publishedAt)}</time>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {post.category.name}
              </span>
            </div>
          </header>
          <MarkdownViewer body={htmlToMarkdown(post.content)} />
        </article>
      </div>
    </main>
  );
}
