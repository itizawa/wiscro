import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogMatter } from '@/shared/types/blog';
import { parseMarkdown } from './markdown';

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'src/content/blog');

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_CONTENT_PATH);
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const fullPath = path.join(BLOG_CONTENT_PATH, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const frontMatter = data as BlogMatter;

      return {
        slug,
        title: frontMatter.title,
        date: frontMatter.date,
        tags: frontMatter.tags || [],
        summary: frontMatter.summary,
        author: frontMatter.author,
        thumbnail: frontMatter.thumbnail,
        published: frontMatter.published ?? true,
        content,
      } as BlogPost;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(BLOG_CONTENT_PATH, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontMatter = data as BlogMatter;

    const post: BlogPost = {
      slug,
      title: frontMatter.title,
      date: frontMatter.date,
      tags: frontMatter.tags || [],
      summary: frontMatter.summary,
      author: frontMatter.author,
      thumbnail: frontMatter.thumbnail,
      published: frontMatter.published ?? true,
      content,
    };

    return post.published ? post : null;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export async function getBlogPostWithHtmlBySlug(slug: string): Promise<(BlogPost & { htmlContent: string }) | null> {
  try {
    const fullPath = path.join(BLOG_CONTENT_PATH, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontMatter = data as BlogMatter;

    const post: BlogPost = {
      slug,
      title: frontMatter.title,
      date: frontMatter.date,
      tags: frontMatter.tags || [],
      summary: frontMatter.summary,
      author: frontMatter.author,
      thumbnail: frontMatter.thumbnail,
      published: frontMatter.published ?? true,
      content,
    };

    if (!post.published) {
      return null;
    }

    const htmlContent = await parseMarkdown(content);
    
    return {
      ...post,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_CONTENT_PATH);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}