# Conceptual Test Cases for News Functionality

This document outlines the conceptual test cases for the news functionality of the application. These tests are designed to ensure the correctness of data fetching, processing, and component rendering. Actual implementation would require a testing framework (e.g., Jest, React Testing Library) and appropriate mocks for Next.js features and file system access.

## I. News Data Fetching and Processing (Utility Functions)

*   **Target Location (Conceptual):** `src/lib/news.test.ts` (assuming data fetching logic might be refactored into a shared `src/lib/news.ts` module in the future. Currently, these functions are part of their respective page components.)
*   **Functions to Test:** `getSortedPostsData()`, `getRecentPostsData()`, `getPostData()`

1.  **Test Case: `getSortedPostsData` returns all posts sorted by date (descending).**
    *   **Setup:**
        *   Mock `fs.readdirSync` to return a list of sample news filenames (e.g., `news1.md`, `news2.md`, `news3.md`).
        *   Mock `fs.readFileSync` to return Markdown content with varying dates in the frontmatter for these files.
    *   **Action:** Call `getSortedPostsData()`.
    *   **Assertion:**
        *   Verify the function returns an array of post objects.
        *   Verify the number of returned posts matches the number of mock files.
        *   Verify each post object contains `id`, `title`, and `date`.
        *   Verify the posts are sorted correctly by date (most recent first, e.g., "2024-01-25" before "2024-01-15").

2.  **Test Case: `getSortedPostsData` handles empty news directory.**
    *   **Setup:** Mock `fs.readdirSync` to return an empty array (`[]`).
    *   **Action:** Call `getSortedPostsData()`.
    *   **Assertion:** Verify the function returns an empty array.

3.  **Test Case: `getRecentPostsData` returns the 5 most recent posts (or fewer if not enough).**
    *   **Setup:** Similar to `getSortedPostsData`, but with (e.g.) 7 mock files with varying dates.
    *   **Action:** Call `getRecentPostsData()`.
    *   **Assertion:**
        *   Verify the function returns an array of at most 5 post objects.
        *   Verify the posts are the 5 most recent ones, sorted correctly.
        *   If fewer than 5 mock files exist, verify all are returned, sorted.

4.  **Test Case: `getPostData` returns correct data for a single existing post.**
    *   **Setup:** Mock `fs.readFileSync` to return specific Markdown content for a given slug (e.g., `news1`). Content should include frontmatter (title, date) and Markdown body.
    *   **Action:** Call `getPostData('news1')`.
    *   **Assertion:**
        *   Verify the returned object contains `id` (matching the slug 'news1'), `title`, `date` from frontmatter.
        *   Verify the `contentHtml` property contains HTML processed from the Markdown body.

5.  **Test Case: `getPostData` handles non-existent post.**
    *   **Setup:** Mock `fs.readFileSync` to throw an error (e.g., `ENOENT`) when trying to read `non-existent-slug.md`.
    *   **Action:** Call `getPostData('non-existent-slug')`.
    *   **Assertion:** Verify the function throws an appropriate error or returns a specific indicator (e.g., `null` or `undefined`), based on its defined error handling strategy.

## II. News List Page (`src/app/news/page.tsx` and `src/components/NewsListClient.tsx`)

*   **Target Location (Conceptual):** `src/app/news/page.test.tsx` or `src/components/NewsListClient.test.tsx`
*   **Components to Test:** `NewsPage` (Server Component) and `NewsListClient` (Client Component). Testing `NewsListClient` with mock props is often the most direct approach for its logic.

1.  **Test Case: `NewsPage` (Server Component) fetches data and correctly passes it to `NewsListClient`.**
    *   **Note:** Direct testing of RSC data flow with client component rendering might require Next.js specific testing utilities.
    *   **Conceptual Assertion:** Verify that `NewsListClient` receives the `allPostsData` prop as fetched and processed by `getSortedPostsData` in `NewsPage`.

2.  **Test Case: `NewsListClient` displays the initial set of posts (e.g., 5 posts).**
    *   **Setup:** Provide a mock `allPostsData` prop to `NewsListClient` containing more than 5 posts (e.g., 7 posts).
    *   **Action:** Render `NewsListClient` with the mock data.
    *   **Assertion:**
        *   Verify that exactly 5 articles/list items are rendered initially.
        *   Verify the titles and dates of these 5 displayed posts match the first 5 from the mock data (sorted).
        *   Verify the "もっと見る" (More) button is visible.

3.  **Test Case: `NewsListClient` displays all posts after clicking "もっと見る".**
    *   **Setup:** Provide mock `allPostsData` (e.g., 7 posts). Render `NewsListClient`.
    *   **Action:** Simulate a user click on the "もっと見る" button.
    *   **Assertion:**
        *   Verify all 7 articles are now rendered.
        *   Verify the button text changes to "閉じる" (Close).

4.  **Test Case: `NewsListClient` toggles back to initial posts after clicking "閉じる".**
    *   **Setup:** Provide mock `allPostsData` (e.g., 7 posts). Render `NewsListClient`. Simulate a click on "もっと見る".
    *   **Action:** Simulate a user click on the "閉じる" button.
    *   **Assertion:**
        *   Verify only the initial 5 articles are rendered.
        *   Verify the button text changes back to "もっと見る".

5.  **Test Case: `NewsListClient` does not display "もっと見る" button if total posts are less than or equal to the initial display count (e.g., <= 5).**
    *   **Setup:** Provide mock `allPostsData` with 3 posts. Render `NewsListClient`.
    *   **Assertion:** Verify the "もっと見る" (More) / "閉じる" (Close) button is not rendered.

6.  **Test Case: Links in `NewsListClient` correctly point to their respective detail pages.**
    *   **Setup:** Render `NewsListClient` with a few mock posts (e.g., `id: 'news1'`, `id: 'news2'`).
    *   **Action:** Inspect the `href` attribute of the rendered links associated with each post title.
    *   **Assertion:** Verify each link correctly points to `/news/news1`, `/news/news2`, etc.

## III. News Detail Page (`src/app/news/[slug]/page.tsx`)

*   **Target Location (Conceptual):** `src/app/news/[slug]/page.test.tsx`
*   **Component to Test:** `PostPage`

1.  **Test Case: `PostPage` correctly displays the post title, date, and processed HTML content.**
    *   **Setup:**
        *   Mock `getPostData` to return a specific post object (e.g., for slug 'test-post', including `title`, `date`, and `contentHtml: '<p>Test content</p>'`).
        *   Mock Next.js router params to provide `{ slug: 'test-post' }`.
    *   **Action:** Render `PostPage`.
    *   **Assertion:**
        *   Verify the post title (from mock data) is rendered in an `<h1>` (or appropriate heading).
        *   Verify the post date (from mock data) is rendered.
        *   Verify the `div` using `dangerouslySetInnerHTML` contains the exact `contentHtml` from the mock data.

2.  **Test Case: `generateMetadata` for `PostPage` returns the correct post title.**
    *   **Setup:** Mock `getPostData` to return a post object with a specific title for a given slug.
    *   **Action:** Call `generateMetadata({ params: { slug: 'test-post' } })`.
    *   **Assertion:** Verify the returned metadata object is `{ title: 'Mock Post Title' }`.

## IV. Homepage - Recent News Section (`src/app/page.tsx`)

*   **Target Location (Conceptual):** `src/app/page.test.tsx`
*   **Component to Test:** `HomePage`

1.  **Test Case: `HomePage` displays the "Recent News" section with up to 5 recent news items.**
    *   **Setup:** Mock `getRecentPostsData` to return an array of 5 mock post items.
    *   **Action:** Render `HomePage`.
    *   **Assertion:**
        *   Verify the "Recent News" section heading is present.
        *   Verify that 5 news items are listed.
        *   Verify the titles and dates for these items are correctly displayed.
        *   Verify each news item title links to its correct detail page (e.g., `/news/[id]`).
        *   Verify the "View All News" button is present and links to `/news`.

2.  **Test Case: `HomePage` displays fewer than 5 items if fewer are available.**
    *   **Setup:** Mock `getRecentPostsData` to return an array of 3 mock post items.
    *   **Action:** Render `HomePage`.
    *   **Assertion:** Verify that exactly 3 news items are listed.

3.  **Test Case: `HomePage` displays a "No news available" message if no news items exist.**
    *   **Setup:** Mock `getRecentPostsData` to return an empty array (`[]`).
    *   **Action:** Render `HomePage`.
    *   **Assertion:**
        *   Verify a message like "No news available at the moment" is displayed within the "Recent News" section.
        *   Verify the "View All News" button is still present and links to `/news`.

This outline serves as a foundational guide for developing a comprehensive test suite for the news functionality once a testing environment is established.
