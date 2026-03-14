"use client";

import { Share } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import Image from "next/image";

const SITE_URL = "https://www.wiscro.app";

export default function ShareButtons({ postId }: { postId: string }) {
  const postUrl = `${SITE_URL}/posts/${postId}`;

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToLine = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(postUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToHatena = () => {
    const url = `https://b.hatena.ne.jp/add?mode=confirm&url=${encodeURIComponent(postUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShare = () => {
    navigator
      ?.share({
        title: "つぶやきを共有",
        url: postUrl,
      })
      .catch(() => void 0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Tooltip title="Xでシェア">
        <IconButton size="small" onClick={shareToTwitter}>
          <Image
            src="/sns/x.png"
            width={16}
            height={16}
            alt="X"
            style={{ display: "block" }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="LINEでシェア">
        <IconButton size="small" onClick={shareToLine}>
          <Image
            src="/sns/line.png"
            width={20}
            height={20}
            alt="LINE"
            style={{ display: "block" }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="はてなブックマークでシェア">
        <IconButton size="small" onClick={shareToHatena}>
          <Image
            src="/sns/hatena.png"
            width={20}
            height={20}
            alt="はてなブックマーク"
            style={{ display: "block" }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="その他でシェア" arrow>
        <IconButton size="small" onClick={handleShare}>
          <Share sx={{ width: 20, height: 20 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
