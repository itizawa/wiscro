"use client";

import { Post } from "@/shared/types/post";
import { Avatar, Box, Typography } from "@mui/material";
import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ExpandedImage from "./ExpandedImage";

const PROFILE_NAME = "wiscro";
const PROFILE_IMAGE = "/icon.jpg";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (differenceInDays(new Date(), date) < 7) {
    return formatDistanceToNow(date, { addSuffix: true, locale: ja });
  }
  return format(date, "yyyy年M月d日", { locale: ja });
}

/**
 * HTML文字列中のハッシュタグ (#タグ) をクリック可能なspanに変換する
 * HTMLタグ内の属性やURLは変換しない
 */
function processHashtags(html: string): string {
  // HTMLタグの外にあるテキスト部分のみを対象にする
  // URLの中やHTMLの属性内のハッシュは無視する
  return html.replace(
    /(<[^>]*>)|(?<!\w)(#[a-zA-Z\u3000-\u9FFF\u4E00-\u9FFF\uF900-\uFAFF\u3041-\u3096\u30A1-\u30FA\u30FC\uFF66-\uFF9Fぁ-んァ-ヶー一-龠a-zA-Z0-9_]+)/g,
    (match, tag) => {
      if (tag) return tag; // HTMLタグはそのまま返す
      const tagName = match.slice(1); // # を除いたタグ名
      return `<span class="hashtag" data-tag="${tagName}" style="color: #1976d2; cursor: pointer;">${match}</span>`;
    },
  );
}

export default function PostItem({
  post,
  onHashtagClick,
}: {
  post: Post;
  onHashtagClick?: (tag: string) => void;
}) {
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const processedBody = processHashtags(post.body);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el || !onHashtagClick) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("hashtag")) {
        e.preventDefault();
        e.stopPropagation();
        const tag = target.dataset.tag;
        if (tag) onHashtagClick(tag);
      }
    };

    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, [onHashtagClick]);

  return (
    <>
      {expandedImage && (
        <ExpandedImage
          src={expandedImage.src}
          alt={expandedImage.alt}
          expand={true}
          onClick={() => setExpandedImage(null)}
        />
      )}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          transition: "background-color 0.15s",
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
          </Box>
          <Box
            ref={bodyRef}
            sx={{
              mt: 0.5,
              color: "text.primary",
              wordBreak: "break-word",
              lineHeight: 1.5,
              fontSize: "0.875rem",
              "& p": { m: 0 },
              "& .hashtag:hover": {
                textDecoration: "underline",
              },
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
            dangerouslySetInnerHTML={{ __html: processedBody }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    setExpandedImage({
                      src: img.url,
                      alt: `投稿画像 ${i + 1}`,
                    });
                  }}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: post.images.length === 1 ? 400 : 200,
                    objectFit: "cover",
                    display: "block",
                    cursor: "zoom-in",
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
