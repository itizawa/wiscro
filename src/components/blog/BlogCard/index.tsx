import { BlogPost } from "@/shared/types/blog";
import { Box, Chip, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

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
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "white",
          "&:hover": { boxShadow: 3 },
          transition: "box-shadow 0.2s",
        }}
      >
        {post.thumbnail && (
          <Box sx={{ height: 192, bgcolor: "#f3f4f6", position: "relative" }}>
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={400}
              height={192}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        )}
        <Box sx={{ p: 2 }}>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              {formatDate(post.date)}
            </Typography>
            <Typography variant="body2" sx={{ color: "#4b5563" }}>
              {post.author}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "#4b5563",
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.summary}
          </Typography>
          {post.tags.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: "#dbeafe",
                    color: "#1e40af",
                    fontSize: "0.75rem",
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Link>
  );
}
