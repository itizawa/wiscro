"use client";

import { Post } from "@/shared/types/post";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PROFILE_NAME = "wiscro";
const PROFILE_IMAGE = "/icon.jpg";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "たった今";
  if (diffMin < 60) return `${diffMin}分前`;
  if (diffHour < 24) return `${diffHour}時間前`;
  if (diffDay < 7) return `${diffDay}日前`;

  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PostItem({ post }: { post: Post }) {
  const router = useRouter();

  return (
    <Link
      href={`/posts/${post.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          "&:hover": {
            bgcolor: "action.hover",
          },
          transition: "background-color 0.15s",
          cursor: "pointer",
        }}
      >
        <Avatar
          src={PROFILE_IMAGE}
          alt={PROFILE_NAME}
          sx={{ width: 40, height: 40, mt: 0.5 }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {formatDate(post.publishedAt || post.createdAt)}
            </Typography>
            {post.label && (
              <Chip
                label={post.label.name}
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/posts?labelId=${post.label!.id}`);
                }}
                sx={{
                  bgcolor: `#${post.label.color}20`,
                  color: `#${post.label.color}`,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  height: 24,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: `#${post.label.color}40`,
                  },
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              mt: 0.5,
              color: "text.primary",
              wordBreak: "break-word",
              lineHeight: 1.5,
              fontSize: "0.875rem",
              "& p": { m: 0 },
              "& img": {
                mt: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                maxWidth: "100%",
                height: "auto",
                maxHeight: 400,
                objectFit: "cover",
                display: "block",
              },
              "& iframe": {
                mt: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                maxWidth: "100%",
                width: "100%",
                aspectRatio: "16 / 9",
                display: "block",
              },
              "& .iframely-embed": {
                mt: 1.5,
              },
            }}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {post.images.length > 0 && (
            <Box
              sx={{
                mt: 1.5,
                display: "grid",
                gridTemplateColumns:
                  post.images.length === 1 ? "1fr" : "1fr 1fr",
                gap: 0.5,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {post.images.map((img, i) => (
                <Image
                  key={i}
                  src={img.url}
                  alt={`投稿画像 ${i + 1}`}
                  width={img.width}
                  height={img.height}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: post.images.length === 1 ? 400 : 200,
                    objectFit: "cover",
                    display: "block",
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
