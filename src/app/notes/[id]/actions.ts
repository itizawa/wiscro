'use server';

import { revalidateTag } from 'next/cache';
import { apiGet } from '~/app/restClient';
import { Note } from '~/domains/Note';

export const fetchNote = async (id: string) => {
  return await apiGet<{ note: Note }>(`/api/notes/${id}`, {
    next: { tags: ['note'] },
    cache: 'no-cache',
  });
};
export const mutateNote = async () => {
  revalidateTag('note');
};
