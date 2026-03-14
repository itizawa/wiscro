import PostFeedLoader from "@/components/post/PostFeedLoader";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
import { getPosts } from "@/shared/lib/post";
import { Box } from "@mui/material";
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
      {/* Feed */}
      <PostFeedLoader initialData={initialData} />
    </Box>
  );
}
