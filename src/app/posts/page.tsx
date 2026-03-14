import PostFeedLoader from "@/components/post/PostFeedLoader";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
import { getPosts } from "@/shared/lib/post";
import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataObject({
  title: "つぶやき | wiscro",
  description: "wiscroのつぶやき",
});

export default async function PostsPage() {
  const initialData = await getPosts({ offset: 0, limit: 20 });

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        borderLeft: { sm: "1px solid" },
        borderRight: { sm: "1px solid" },
        borderColor: { sm: "divider" },
        minHeight: "calc(100vh - 64px)",
      }}
    >
      {/* Profile header */}
      <Box
        sx={{
          px: 2,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          ポスト
        </Typography>
      </Box>

      {/* Feed */}
      <PostFeedLoader initialData={initialData} />
    </Box>
  );
}
