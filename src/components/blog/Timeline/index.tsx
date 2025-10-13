import { Blog } from "@/shared/types/blog";
import Link from "next/link";

type TimelineProps = {
  posts: Blog[];
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function Timeline({ posts }: TimelineProps) {
  return (
    <div className="w-full">
      <ol className="relative">
        {posts.map((post, index) => (
          <li key={post.id} className="flex gap-4">
            <div className="flex flex-col items-center min-w-8">
              <img
                src={post.category.icon.url}
                alt={post.category.icon.url}
                width={32}
                height={32}
                className="w-8 h-8 object-cover"
              />
              {index < posts.length - 1 && (
                <div className="h-full bg-blue-100 w-[2px]" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text text-gray-600 pt-1">
                <time className="font-bold">
                  {formatDate(post.publishedAt)}
                </time>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {post.category.name}
                </span>
              </div>
              <Link href={`/blogs/${post.id}`}>
                <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col gap-2">
                  <h3 className="font-bold text-lg text-gray-900 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.summary}
                  </p>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Timeline;
