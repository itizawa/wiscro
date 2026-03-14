import BackButton from "@/components/post/BackButton";
import PostItem from "@/components/post/PostItem";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
import { getPostById } from "@/shared/lib/post";
import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) return generateMetadataObject({ title: "投稿が見つかりません" });

  const plainText = post.body.replace(/<[^>]*>/g, "").slice(0, 100);
  return generateMetadataObject({
    title: `${plainText} | wiscro`,
    description: plainText,
  });
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

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
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <BackButton />
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          投稿
        </Typography>
      </Box>

      <PostItem post={post} />
    </Box>
  );
}
