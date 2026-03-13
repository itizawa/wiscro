import Timeline from "@/components/blog/Timeline";
import { getAllBlogPosts } from "@/shared/lib/blog_v2";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataObject({
  title: "コンテンツ一覧 | wiscro",
  description:
    "wiscoroのコンテンツ一覧。技術情報や企業活動について発信しています。",
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts({ limit: 100 });

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
      <Box
        sx={{
          maxWidth: "1152px",
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box component="header" sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#111827", mb: 2 }}>
            更新情報
          </Typography>
        </Box>
        <Timeline posts={posts} />
      </Box>
    </Box>
  );
}
