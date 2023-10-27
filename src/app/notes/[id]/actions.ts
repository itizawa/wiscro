'use server';

import { revalidateTag } from 'next/cache';
import { Note } from '~/domains/Note';
import { restClient } from '~/libs/restClient';

export const fetchNote = async (id: string) => {
  return await restClient.apiGet<{ note: Note }>(`/api/notes/${id}`, { next: { tags: ['note'] } });
};
export const mutateNote = async () => {
  revalidateTag('note');
};
