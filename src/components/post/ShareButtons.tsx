"use client";

import { Share } from "@mui/icons-material";
import { Button } from "@mui/material";

const SITE_URL = "https://www.wiscro.app";

export default function ShareButtons({ postId }: { postId: string }) {
  const postUrl = `${SITE_URL}/posts/${postId}`;

  const handleShare = () => {
    navigator
      ?.share({
        title: "つぶやきを共有",
        url: postUrl,
      })
      .catch(() => void 0);
  };

  return (
    <Button
      size="small"
      startIcon={<Share sx={{ width: 18, height: 18 }} />}
      onClick={handleShare}
      sx={{
        color: "text.secondary",
        textTransform: "none",
        fontSize: "0.8rem",
        minWidth: 0,
        px: 1,
        fontWeight: 700,
      }}
    >
      シェア
    </Button>
  );
}
