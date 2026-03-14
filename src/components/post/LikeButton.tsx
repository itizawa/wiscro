"use client";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const STORAGE_KEY = "liked_post_ids";

function getLikedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveLikedIds(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export default function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(getLikedIds().has(postId));
  }, [postId]);

  const toggleLike = () => {
    const ids = getLikedIds();
    if (ids.has(postId)) {
      ids.delete(postId);
      setLiked(false);
    } else {
      ids.add(postId);
      setLiked(true);
    }
    saveLikedIds(ids);
  };

  return (
    <Button
      size="small"
      startIcon={
        liked ? (
          <ThumbUpAltIcon sx={{ width: 18, height: 18 }} />
        ) : (
          <ThumbUpOffAltIcon sx={{ width: 18, height: 18 }} />
        )
      }
      onClick={toggleLike}
      sx={{
        color: liked ? "#e8932a" : "text.secondary",
        textTransform: "none",
        fontSize: "0.8rem",
        minWidth: 0,
        px: 1,
        fontWeight: 700,
      }}
    >
      いいね
    </Button>
  );
}
