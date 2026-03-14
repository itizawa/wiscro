"use client";

import { Box, Typography } from "@mui/material";
import { createPortal } from "react-dom";

type Props = {
  src: string;
  alt: string;
  expand: boolean;
  onClick: () => void;
};

export default function ExpandedImage({ src, alt, expand, onClick }: Props) {
  return createPortal(
    <Box
      onClick={onClick}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
        opacity: expand ? 1 : 0,
        pointerEvents: expand ? "auto" : "none",
        cursor: "zoom-out",
        transition: "opacity 0.2s",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          top: 8,
          left: 16,
          color: "white",
          fontWeight: 700,
        }}
      >
        {alt}
      </Typography>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </Box>,
    document.body,
  );
}
