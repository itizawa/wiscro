"use client";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Tooltip } from "@mui/material";
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
    <Tooltip title={liked ? "いいね済み" : "いいね"} arrow>
      <IconButton size="small" onClick={toggleLike}>
        {liked ? (
          <FavoriteIcon sx={{ width: 18, height: 18, color: "#e91e63" }} />
        ) : (
          <FavoriteBorderIcon
            sx={{ width: 18, height: 18, color: "text.secondary" }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
}
