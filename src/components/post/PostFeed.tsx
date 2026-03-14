"use client";

import { Post } from "@/shared/types/post";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
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
}: {
  initialData: PostListResponse;
}) {
  const [posts, setPosts] = useState<Post[]>(initialData.contents);
  const [hasMore, setHasMore] = useState(
    initialData.offset + initialData.contents.length < initialData.totalCount,
  );
  const [isLoading, setIsLoading] = useState(false);
  const offsetRef = useRef(initialData.contents.length);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const res = await fetch(
        `/api/posts?offset=${offsetRef.current}&limit=${LIMIT}`,
      );
      const data: PostListResponse = await res.json();

      setPosts((prev) => [...prev, ...data.contents]);
      offsetRef.current += data.contents.length;

      if (offsetRef.current >= data.totalCount || data.contents.length === 0) {
        setHasMore(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore]);

  return (
    <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
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
