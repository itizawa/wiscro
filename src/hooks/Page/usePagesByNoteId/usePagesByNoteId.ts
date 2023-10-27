import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { apiGet } from '~/app/restClient';
import { Page } from '~/domains/Page';

const getKey = (noteId: string) => `/api/notes/${noteId}/pages`;

export const usePagesByNoteId = ({ noteId, fallbackData }: { noteId: string; fallbackData: Page[] }) => {
  return useSWR(getKey(noteId), (endpoint) => apiGet<{ pages: Page[] }>(endpoint).then((res) => res.pages), {
    fallbackData,
    refreshInterval: 5000,
  });
};

export const useMutatePagesByNoteId = () => {
  const mutatePagesByNoteId = useCallback((noteId: string) => {
    mutate(getKey(noteId));
  }, []);

  return { mutatePagesByNoteId };
};
