"use client";

import { Post, PostLabel } from "@/shared/types/post";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import PostItem from "./PostItem";

interface PostListResponse {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
}

const LIMIT = 20;

export default function PostFeed({
  initialData,
  labels,
}: {
  initialData: PostListResponse;
  labels: PostLabel[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const labelId = searchParams.get("labelId") ?? undefined;

  const [posts, setPosts] = useState<Post[]>(initialData.contents);
  const [hasMore, setHasMore] = useState(
    initialData.offset + initialData.contents.length < initialData.totalCount,
  );
  const [isLoading, setIsLoading] = useState(false);
  const offsetRef = useRef(initialData.contents.length);

  // labelIdが変わったらデータをリセットして再取得
  useEffect(() => {
    const fetchFiltered = async () => {
      setIsLoading(true);
      try {
        const url = labelId
          ? `/api/posts?offset=0&limit=${LIMIT}&labelId=${labelId}`
          : `/api/posts?offset=0&limit=${LIMIT}`;
        const res = await fetch(url);
        const data: PostListResponse = await res.json();
        setPosts(data.contents);
        offsetRef.current = data.contents.length;
        setHasMore(data.contents.length < data.totalCount);
      } finally {
        setIsLoading(false);
      }
    };

    // 初回レンダリング時はinitialDataを使うのでスキップ
    // searchParamsが変わった時のみ再取得
    fetchFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelId]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const url = labelId
        ? `/api/posts?offset=${offsetRef.current}&limit=${LIMIT}&labelId=${labelId}`
        : `/api/posts?offset=${offsetRef.current}&limit=${LIMIT}`;
      const res = await fetch(url);
      const data: PostListResponse = await res.json();

      setPosts((prev) => [...prev, ...data.contents]);
      offsetRef.current += data.contents.length;

      if (offsetRef.current >= data.totalCount || data.contents.length === 0) {
        setHasMore(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, labelId]);

  const handleLabelClick = (id: string) => {
    if (labelId === id) {
      router.push("/posts");
    } else {
      router.push(`/posts?labelId=${id}`);
    }
  };

  return (
    <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
      {labels.length > 0 && (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {labels.map((label) => (
            <Chip
              key={label.id}
              label={label.name}
              size="small"
              variant={labelId === label.id ? "filled" : "outlined"}
              onClick={() => handleLabelClick(label.id)}
              sx={{
                bgcolor:
                  labelId === label.id
                    ? `#${label.color}30`
                    : "transparent",
                color: `#${label.color}`,
                borderColor: `#${label.color}60`,
                fontWeight: 600,
                fontSize: "0.75rem",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: `#${label.color}20`,
                },
              }}
            />
          ))}
        </Box>
      )}
      <Virtuoso
        data={posts}
        endReached={loadMore}
        overscan={400}
        itemContent={(_, post) => <PostItem key={post.id} post={post} />}
        components={{
          Footer: () =>
            isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <CircularProgress size={24} />
              </Box>
            ) : !hasMore && posts.length > 0 ? (
              <Typography
                variant="body2"
                sx={{ textAlign: "center", py: 3, color: "text.secondary" }}
              >
                これ以上の投稿はありません
              </Typography>
            ) : null,
        }}
      />
    </Box>
  );
}
