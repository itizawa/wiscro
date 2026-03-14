"use client";

import dynamic from "next/dynamic";
import { Box, CircularProgress } from "@mui/material";
import { Post, PostLabel } from "@/shared/types/post";

const PostFeed = dynamic(() => import("./PostFeed"), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <CircularProgress size={24} />
    </Box>
  ),
});

interface PostListResponse {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
}

export default function PostFeedLoader({
  initialData,
  labels,
}: {
  initialData: PostListResponse;
  labels: PostLabel[];
}) {
  return <PostFeed initialData={initialData} labels={labels} />;
}
