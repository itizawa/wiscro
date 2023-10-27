import { useCallback } from 'react';
import { apiPost } from '~/app/restClient';
import { Note } from '~/domains/Note';

type Args = Pick<Note, 'description' | 'title'>;

export const usePostNote = () => {
  const postNote = useCallback(async ({ title, description }: Args) => {
    return apiPost<{ note: Note }>('/api/notes', {
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }, []);

  return { postNote };
};
