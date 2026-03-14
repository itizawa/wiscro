import { MarkdownViewer } from "@/components/MarkdownViewer";
import { BlogPost as BlogPostType } from "@/shared/types/blog";
import { Box, Button, Chip, Typography } from "@mui/material";
import Image from "next/image";

interface BlogPostProps {
  post: BlogPostType & { htmlContent: string };
}

export function BlogPost({ post }: BlogPostProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box
      component="article"
      sx={{
        maxWidth: "896px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box component="header">
        {post.thumbnail && (
          <Box sx={{ mb: 4 }}>
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={800}
              height={256}
              style={{
                width: "100%",
                height: 256,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </Box>
        )}
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#111827", mb: 1 }}>
          {post.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#4b5563",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2">
              <time>{formatDate(post.date)}</time>
            </Typography>
            <Typography variant="body2">{post.author}</Typography>
          </Box>
        </Box>
        {post.tags.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: "#dbeafe",
                  color: "#1e40af",
                  fontSize: "0.875rem",
                }}
              />
            ))}
          </Box>
        )}
      </Box>
      <Box sx={{ wordBreak: "break-word" }}>
        <MarkdownViewer body={post.htmlContent} />
      </Box>

      <Box sx={{ p: 3, bgcolor: "#f9fafb", borderRadius: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          筆者プロフィール
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 128,
              height: 128,
              borderRadius: "50%",
              overflow: "hidden",
              mx: { xs: "auto", md: 0 },
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography sx={{ textAlign: { xs: "center", md: "left" } }}>
                私は埼玉県北部で地域密着型の採用支援活動を行っております。
              </Typography>
              <Typography sx={{ textAlign: { xs: "center", md: "left" } }}>
                あなたの会社の課題を教えて下さい。
              </Typography>
              <Typography sx={{ textAlign: { xs: "center", md: "left" } }}>
                一緒に解決していきましょう。
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeNmuXo7-05iU_m5ge4pq_1pysVTqcis8JWOgrupso1foOZpw/viewform?usp=dialogo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#1565c0",
                    "&:hover": { bgcolor: "#0d47a1" },
                    fontWeight: "bold",
                    px: 4,
                    py: 1,
                    borderRadius: 1,
                    textTransform: "none",
                  }}
                >
                  お問い合わせ
                </Button>
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
