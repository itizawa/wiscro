import { Blog } from "@/shared/types/blog";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
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
    <Box component="ol" sx={{ position: "relative", listStyle: "none", p: 0, m: 0 }}>
      {posts.map((post, index) => (
        <Box component="li" key={post.id} sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 32,
            }}
          >
            <Image
              src={post.category.icon.url}
              alt={post.category.name}
              width={32}
              height={32}
              style={{ width: 32, height: 32, objectFit: "cover" }}
            />
            {index < posts.length - 1 && (
              <Box
                sx={{
                  flexGrow: 1,
                  width: 2,
                  bgcolor: "#dbeafe",
                }}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1, pb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "#4b5563", pt: 0.5 }}>
              <Typography component="time" fontWeight="bold" variant="body2">
                {formatDate(post.publishedAt)}
              </Typography>
            </Box>
            <Link href={`/blogs/${post.id}`} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "white",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  "&:hover": { boxShadow: 3 },
                  transition: "box-shadow 0.2s",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    color: "#111827",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#4b5563",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.summary}
                </Typography>
              </Box>
            </Link>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Timeline;
