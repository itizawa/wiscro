import { useCallback } from 'react';
import { Note } from '~/domains/Note';
import { restClient } from '~/libs/restClient';

type Args = Pick<Note, '_id' | 'description' | 'title'>;

export const useUpdateNote = () => {
  const updateNote = useCallback(async ({ _id, title, description }: Args) => {
    return restClient.apiPatch<{ note: Note }>(`/api/notes/${_id}`, {
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }, []);

  return { updateNote };
};
