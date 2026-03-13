import { BlogPost } from "@/shared/types/blog";
import { Box } from "@mui/material";
import { BlogCard } from "../BlogCard";

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: 3,
      }}
    >
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </Box>
  );
}
