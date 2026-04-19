import RssTimelineList from "@/components/timeline/RssTimelineList";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
import { selectTimeline } from "@/shared/lib/timelineRepository";
import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateMetadataObject({
  title: "タイムライン | wiscro",
  description: "wiscroのYouTubeやnoteなどの更新情報をまとめたタイムラインです。",
});

export default async function TimelinePage() {
  const items = await selectTimeline();

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
          maxWidth: "960px",
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#111827", mb: 3, pb: 1, borderBottom: "1px solid #e5e7eb" }}
        >
          タイムライン
        </Typography>

        <RssTimelineList items={items} />
      </Box>
    </Box>
  );
}
