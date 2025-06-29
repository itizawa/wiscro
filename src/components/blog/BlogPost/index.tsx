import { MarkdownViewer } from "@/components/MarkdownViewer";
import { BlogPost as BlogPostType } from "@/shared/types/blog";
import Image from "next/image";

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
    <article className="max-w-4xl mx-auto space-y-8">
      <header>
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

      <div className="p-6 bg-gray-50 rounded-lg space-y-4">
        <h3 className="text-xl font-bold mb-4">筆者プロフィール</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto">
            <Image
              src="/icon.jpg"
              alt="市澤 樹享"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-center md:text-left">
                私は埼玉県北部で地域密着型の採用支援活動を行っております。
              </p>
              <p className="text-center md:text-left">
                あなたの会社の課題を教えて下さい。
              </p>
              <p className="text-center md:text-left">
                一緒に解決していきましょう。
              </p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <a href="https://lin.ee/1L3YVfh">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
                  alt="友だち追加"
                  className="h-10 w-32"
                  style={{ border: 0, width: "100%" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
