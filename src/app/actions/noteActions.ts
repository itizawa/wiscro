'use server';

import { revalidateTag } from 'next/cache';
import { apiGet, apiPatch, apiPost } from '~/app/restClient';
import { API_NOTE_DETAIL, API_NOTE_LIST, API_NOTE_PAGE_LIST } from '~/constants/apiUrls';
import { Note } from '~/domains/Note';
import { Page } from '~/domains/Page';

export const fetchNote = async (id: string) => {
  return await apiGet<{ note: Note }>(API_NOTE_DETAIL(id), {
    next: { tags: [API_NOTE_DETAIL(id)] },
  });
};

export const fetchNotePages = async (id: string) => {
  return await apiGet<{ pages: Page[] }>(API_NOTE_PAGE_LIST(id), {
    next: { tags: [API_NOTE_PAGE_LIST(id)], revalidate: 5 },
  });
};

export const postNote = async ({ title, description }: Pick<Note, 'description' | 'title'>) => {
  return apiPost<{ note: Note }>('/api/notes', {
    body: JSON.stringify({
      title,
      description,
    }),
  });
};

export const updateNote = async ({ _id, title, description }: Pick<Note, '_id' | 'description' | 'title'>) => {
  await apiPatch<{ note: Note }>(`/api/notes/${_id}`, {
    body: JSON.stringify({
      title,
      description,
    }),
  });
  revalidateTag(API_NOTE_DETAIL(_id));
  revalidateTag(API_NOTE_LIST());
};
