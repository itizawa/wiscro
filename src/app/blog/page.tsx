import { BlogList } from "@/components/blog/BlogList";
import { getAllBlogPosts } from "@/shared/lib/blog";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataObject({
  title: "コンテンツ一覧 | wiscro",
  description:
    "wiscoroのコンテンツ一覧。技術情報や企業活動について発信しています。",
});

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main
      className="min-h-screen py-8"
      style={{
        backgroundImage: `linear-gradient(45deg, rgb(139 208 254 / 30%), rgba(0, 123, 255, 0))`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            コンテンツ一覧
          </h1>
          <p className="text-gray-600">
            技術情報や企業活動について発信しています。
          </p>
        </header>

        <BlogList posts={posts} />
      </div>
    </main>
  );
}
