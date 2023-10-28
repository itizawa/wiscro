'use server';

import { revalidateTag } from 'next/cache';
import { apiGet, apiPatch, apiPost } from '~/app/restClient';
import { Note } from '~/domains/Note';

const TAG = 'notes';
export const fetchNote = async (id: string) => {
  return await apiGet<{ note: Note }>(`/api/notes/${id}`, {
    next: { tags: [TAG] },
    cache: 'no-cache',
  });
};

export const fetchNotes = async () => {
  return await apiGet<{ notes: Note[] }>(`/api/notes`, {
    next: { tags: [TAG], revalidate: 60 },
  });
};

export const mutateNote = async () => {
  revalidateTag(TAG);
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
  mutateNote();
};
