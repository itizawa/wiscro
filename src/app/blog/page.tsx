import { BlogList } from "@/components/blog/BlogList";
import { getAllBlogPosts } from "@/shared/lib/blog";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataObject({
  title: "コンテンツ一覧 | wiscro",
  description:
    "wiscoroのコンテンツ一覧。技術情報や企業活動について発信しています。",
});

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        py: 4,
        backgroundImage:
          "linear-gradient(45deg, rgb(139 208 254 / 30%), rgba(0, 123, 255, 0))",
      }}
    >
      <Box sx={{ maxWidth: "1152px", mx: "auto", px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box component="header" sx={{ mb: 6 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#111827", mb: 2 }}>
            コンテンツ一覧
          </Typography>
          <Typography sx={{ color: "#4b5563" }}>
            技術情報や企業活動について発信しています。
          </Typography>
        </Box>
        <BlogList posts={posts} />
      </Box>
    </Box>
  );
}
