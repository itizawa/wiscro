'use server';

import { apiGet } from '~/app/restClient';
import { API_NOTE_DETAIL, API_NOTE_LIST, API_NOTE_PAGE_LIST } from '~/constants/apiUrls';
import { Note } from '~/domains/Note';
import { Page } from '~/domains/Page';

export const fetchNote = async (id: string) => {
  return await apiGet<{ note: Note }>(API_NOTE_DETAIL(id), {
    next: { tags: [API_NOTE_DETAIL(id)] },
  });
};

export const fetchNotes = async () => {
  return await apiGet<{ notes: Note[] }>(API_NOTE_LIST(), {
    // 60秒間はキャッシュを使うので単体のキャッシュを保持しない
    next: { tags: [API_NOTE_LIST()], revalidate: 60 },
  });
};

export const fetchNotePages = async (id: string) => {
  return await apiGet<{ pages: Page[] }>(API_NOTE_PAGE_LIST(id), {
    next: { tags: [API_NOTE_PAGE_LIST(id)], revalidate: 5 },
  });
};
