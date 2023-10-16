import { useCallback } from 'react';
import { Note } from '~/domains/Note';
import { restClient } from '~/libs/restClient';

type Args = Pick<Note, 'description' | 'title'>;

export const usePostNote = () => {
  const postNote = useCallback(async ({ title, description }: Args) => {
    return restClient.apiPost<{ note: Note }>('/api/notes', {
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }, []);

  return { postNote };
};
