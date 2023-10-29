import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { apiGet } from '~/app/restClient';
import { Note } from '~/domains/Note';

const getKey = (noteId: string) => `/api/notes/${noteId}`;

export const useNote = ({ noteId, fallbackData }: { noteId: string; fallbackData: Note }) => {
  return useSWR(getKey(noteId), (endpoint) => apiGet<{ note: Note }>(endpoint).then((res) => res.note), {
    fallbackData,
  });
};

export const useMutateNote = () => {
  const mutateNote = useCallback((noteId: string) => {
    mutate(getKey(noteId));
  }, []);

  return { mutateNote };
};
