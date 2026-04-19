import ScrollHandler from "@/components/ScrollHandler";
import Timeline from "@/components/blog/Timeline";
import RssTimelineList from "@/components/timeline/RssTimelineList";
import { getAllBlogPosts as getAllBlogPostsV2 } from "@/shared/lib/blog_v2";
import { selectTimeline } from "@/shared/lib/timelineRepository";
import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [recentPostsV2, recentTimelineItems] = await Promise.all([
    getAllBlogPostsV2(),
    selectTimeline(3),
  ]);

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage:
          "linear-gradient(45deg, rgb(139 208 254 / 30%), rgba(0, 123, 255, 0))",
      }}
    >
      <ScrollHandler />

      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          height: { xs: 224, md: 600 },
          position: "relative",
          width: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              bottom: 32,
              left: 32,
              p: { xs: 3, md: 4 },
              bgcolor: "rgba(255,255,255,0.8)",
              borderRadius: 2,
              boxShadow: 3,
              color: "#2F4A7B",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                sx={{ fontSize: { md: "2.25rem" }, fontWeight: "bold" }}
              >
                WEBの力で事業を前に進める
              </Typography>
              <Typography
                sx={{ fontSize: { md: "1.5rem" }, fontWeight: "bold" }}
              >
                顧客に寄り添う地域密着型のシステム屋さん
              </Typography>
            </Box>
          </Box>
        </Container>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/eye-catch.png"
          alt="wiscro"
          style={{
            height: "100%",
            objectFit: "cover",
            width: "100vw",
            objectPosition: "top",
          }}
        />
      </Box>

      {/* Mobile hero text */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          py: 3,
          px: 2,
          color: "#2F4A7B",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography fontWeight="bold">WEBの力で事業を前に進める</Typography>
          <Typography variant="body2" fontWeight="bold">
            顧客に寄り添う地域密着型のシステム屋さん
          </Typography>
        </Box>
      </Box>

      {/* Representative Introduction */}
      <Box
        component="section"
        id="representative"
        sx={{
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 },
          maxWidth: "1152px",
          mx: "auto",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 3, pb: 1, borderBottom: "1px solid #e5e7eb" }}
        >
          団体紹介
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: 128,
              height: 128,
              borderRadius: "50%",
              overflow: "hidden",
              bgcolor: "#e5e7eb",
              flexShrink: 0,
            }}
          >
            <Image
              src="/icon.jpg"
              alt="ウィズクロ"
              width={128}
              height={128}
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold">
              wiscro（ウィズクロ）
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body1">
                深谷市を拠点に夫婦でコンテンツ制作・手芸販売を行なっています。
              </Typography>
              <Typography variant="body1">
                専門はソフトウェア開発です。ホームページ作成やITにお困りの方はお気軽にご相談ください。
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Blog / Updates Section */}
      <Box
        component="section"
        id="blogs"
        sx={{
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 },
          maxWidth: "1152px",
          mx: "auto",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 3, pb: 1, borderBottom: "1px solid #e5e7eb" }}
        >
          お知らせ
        </Typography>
        <Timeline posts={recentPostsV2} />
      </Box>

      {/* Timeline Section (Latest 3) */}
      <Box
        component="section"
        id="timeline"
        sx={{
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 },
          maxWidth: "1152px",
          mx: "auto",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            mb: 3,
            pb: 1,
            borderBottom: "1px solid #e5e7eb",
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            更新情報
          </Typography>
          <Link
            href="/timeline"
            style={{
              color: "#2F4A7B",
              fontSize: "0.875rem",
              fontWeight: "bold",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            もっと見る →
          </Link>
        </Box>
        <RssTimelineList
          items={recentTimelineItems}
          emptyMessage="最新の更新情報はまだありません。"
        />
      </Box>

      {/* Company Overview */}
      <Box
        component="section"
        id="company-overview"
        sx={{
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 },
          maxWidth: "1152px",
          mx: "auto",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 2, pb: 1, borderBottom: "1px solid #e5e7eb" }}
        >
          概要
        </Typography>
        <Box sx={{ bgcolor: "white", borderRadius: 2, p: 3 }}>
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableBody>
                {[
                  ["団体名", "wiscro（ウィズクロ）"],
                  ["代表者", "市澤 樹享"],
                  ["設立", "2023年5月18日"],
                  ["所在地", "埼玉県深谷市"],
                  ["事業内容", "コンテンツ制作・手芸販売"],
                ].map(([label, value], i, arr) => (
                  <TableRow
                    key={label}
                    sx={{
                      borderBottom:
                        i < arr.length - 1 ? "1px solid #e5e7eb" : "none",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        py: 2,
                        pr: 2,
                        textAlign: "left",
                        width: "25%",
                        color: "#4b5563",
                        fontWeight: 400,
                        borderBottom: "none",
                      }}
                    >
                      {label}
                    </TableCell>
                    <TableCell sx={{ py: 2, borderBottom: "none" }}>
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
