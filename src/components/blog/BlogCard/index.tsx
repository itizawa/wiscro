import { BlogPost } from "@/shared/types/blog";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200">
        {post.thumbnail && (
          <div className="h-48 bg-gray-100 relative">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={400}
              height={192}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <time className="text-sm text-gray-500">
              {formatDate(post.date)}
            </time>
            <span className="text-sm text-gray-600">{post.author}</span>
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-3">
            {post.summary}
          </p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
