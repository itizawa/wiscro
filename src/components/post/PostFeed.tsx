"use client";

import { Post } from "@/shared/types/post";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearchParams } from "next/navigation";
import { useCallback, useDeferredValue, useEffect, useRef, useState } from "react";
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
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const [posts, setPosts] = useState<Post[]>(initialData.contents);
  const [hasMore, setHasMore] = useState(
    initialData.offset + initialData.contents.length < initialData.totalCount,
  );
  const [isLoading, setIsLoading] = useState(false);
  const offsetRef = useRef(initialData.contents.length);
  const [searchInput, setSearchInput] = useState(q);
  const deferredQuery = useDeferredValue(searchInput);

  // qが外部から変わったときにinputを同期
  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  // deferredQueryが変わったらデータをリセットして再取得
  useEffect(() => {
    const trimmed = deferredQuery.trim();
    const fetchFiltered = async () => {
      setIsLoading(true);
      try {
        const url = trimmed
          ? `/api/posts?offset=0&limit=${LIMIT}&q=${encodeURIComponent(trimmed)}`
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

    fetchFiltered();
  }, [deferredQuery]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    const trimmed = deferredQuery.trim();
    try {
      const baseUrl = `/api/posts?offset=${offsetRef.current}&limit=${LIMIT}`;
      const url = trimmed
        ? `${baseUrl}&q=${encodeURIComponent(trimmed)}`
        : baseUrl;
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
  }, [isLoading, hasMore, deferredQuery]);

  const handleClear = () => {
    setSearchInput("");
  };

  const handleHashtagClick = (tag: string) => {
    setSearchInput(`#${tag}`);
  };

  return (
    <Box sx={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          px: 2,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          wiscroのつぶやき
        </Typography>
      </Box>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <TextField
          size="small"
          fullWidth
          placeholder="投稿を検索..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: searchInput ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClear}>
                    <ClearIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 5,
              bgcolor: "action.hover",
            },
          }}
        />
      </Box>
      <Virtuoso
        style={{ flex: 1 }}
        data={posts}
        endReached={loadMore}
        overscan={400}
        itemContent={(_, post) => (
          <PostItem
            key={post.id}
            post={post}
            onHashtagClick={handleHashtagClick}
          />
        )}
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
