import type { RssItem } from "@/shared/types/rss";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const sourceColor: Record<string, "error" | "success" | "primary"> = {
  youtube: "error",
  note: "success",
};

const SourceIcon = ({ source }: { source: string }) => {
  if (source === "youtube") return <YouTubeIcon fontSize="small" />;
  if (source === "note") return <MusicNoteIcon fontSize="small" />;
  return null;
};

type RssTimelineListProps = {
  items: RssItem[];
  emptyMessage?: string;
};

export function RssTimelineList({
  items,
  emptyMessage = "現在取得できる更新情報はありません。",
}: RssTimelineListProps) {
  if (items.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <Timeline
      position="right"
      sx={{
        p: 0,
        m: 0,
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {items.map((item, index) => (
        <TimelineItem key={item.id}>
          <TimelineSeparator>
            <TimelineDot color={sourceColor[item.source] ?? "primary"}>
              <SourceIcon source={item.source} />
            </TimelineDot>
            {index < items.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent sx={{ pb: 3, pt: 0 }}>
            <MuiLink
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{ display: "block" }}
            >
              <Box
                sx={{
                  bgcolor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  gap: 2,
                  "&:hover": { boxShadow: 3 },
                  transition: "box-shadow 0.2s",
                }}
              >
                {item.thumbnail && (
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: { xs: 96, sm: 160 },
                      aspectRatio: "16 / 9",
                      overflow: "hidden",
                      borderRadius: 1,
                      bgcolor: "#f3f4f6",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnail}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
                <Stack spacing={0.75} sx={{ flex: 1, minWidth: 0 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ color: "text.secondary" }}
                  >
                    <Typography variant="caption" fontWeight="bold">
                      {formatDate(item.publishedAt)}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.5 }}>
                      ・
                    </Typography>
                    <Typography variant="caption" fontWeight="bold">
                      {item.sourceLabel}
                    </Typography>
                    <OpenInNewIcon sx={{ fontSize: 14 }} />
                  </Stack>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      color: "#111827",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </Typography>
                  {item.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#4b5563",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </Typography>
                  )}
                </Stack>
              </Box>
            </MuiLink>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default RssTimelineList;
