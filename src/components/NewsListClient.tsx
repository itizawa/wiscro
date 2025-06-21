'use client';

import Link from 'next/link';
import { useState } from 'react';

interface PostData {
  id: string;
  title: string;
  date: string;
}

interface NewsListClientProps {
  allPostsData: PostData[];
}

const postsToShowInitially = 5;

export default function NewsListClient({ allPostsData }: NewsListClientProps) {
  const [showAll, setShowAll] = useState(false);

  const postsToDisplay = showAll ? allPostsData : allPostsData.slice(0, postsToShowInitially);

  return (
    <>
      <div className="grid gap-6">
        {postsToDisplay.map(({ id, title, date }) => (
          <article key={id} className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/news/${id}`} className="hover:underline">
                {title}
              </Link>
            </h2>
            <p className="text-gray-600 text-sm mb-4">{date}</p>
            {/* Snippet can be added here if needed */}
          </article>
        ))}
      </div>
      {allPostsData.length > postsToShowInitially && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {showAll ? '閉じる' : 'もっと見る'}
          </button>
        </div>
      )}
    </>
  );
}
