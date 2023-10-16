import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { Note } from '~/domains/Note';
import { restClient } from '~/libs/restClient';

const getKey = () => `/api/notes`;

export const useNotes = () => {
  return useSWR(getKey(), (endpoint) => restClient.apiGet<{ notes: Note[] }>(endpoint).then((res) => res.notes));
};

export const useMutateNotes = () => {
  const mutateNotes = useCallback(() => {
    mutate(getKey());
  }, []);

  return { mutateNotes };
};
