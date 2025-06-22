import { MarkdownViewer } from "@/components/MarkdownViewer";
import { BlogPost as BlogPostType } from "@/shared/types/blog";

interface BlogPostProps {
  post: BlogPostType & { htmlContent: string };
}

export function BlogPost({ post }: BlogPostProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-4">
            <time>{formatDate(post.date)}</time>
            <span>{post.author}</span>
          </div>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {post.thumbnail && (
          <div className="mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
      </header>
      <div className="prose space-y-4 break-words">
        <MarkdownViewer body={post.htmlContent} />
      </div>
    </article>
  );
}
