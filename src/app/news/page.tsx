import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// Keep fs, path, matter for data fetching
// Link is no longer directly used here, but NewsListClient uses it.
// No 'use client' here; this remains a Server Component.

import NewsListClient from '@/components/NewsListClient'; // Adjust path if necessary

const postsDirectory = path.join(process.cwd(), 'contents/news');

// Interface for PostData, can be shared or defined if not already
interface PostData {
  id: string;
  title: string;
  date: string;
}

async function getSortedPostsData(): Promise<PostData[]> {
  // Get file names under /contents/news
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { title: string; date: string }), // Type assertion
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export default async function NewsPage() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">News</h1>
      <NewsListClient allPostsData={allPostsData} />
    </div>
  );
}
