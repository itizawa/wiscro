"use client";

import { Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/posts")) return null;

  return (
  <Box
    component="footer"
    sx={{ bgcolor: "#1f2937", color: "white", py: 3 }}
  >
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        wiscro
      </Typography>
      <Typography variant="body2">
        &copy; 2025 wiscro. All rights reserved.
      </Typography>
    </Box>
  </Box>
  );
};
