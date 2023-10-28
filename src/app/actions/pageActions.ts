'use server';

import { revalidateTag } from 'next/cache';
import { apiPost } from '~/app/restClient';
import { API_NOTE_PAGE_LIST } from '~/constants/apiUrls';

export const postPage = async ({ url, noteId }: { url: string; noteId: string }) => {
  await apiPost('/api/pages', { body: JSON.stringify({ url, noteId }) });
  revalidateTag(API_NOTE_PAGE_LIST(noteId));
};
