import { useCallback } from 'react';
import { apiPatch } from '~/app/restClient';
import { Note } from '~/domains/Note';

type Args = Pick<Note, '_id' | 'description' | 'title'>;

export const useUpdateNote = () => {
  const updateNote = useCallback(async ({ _id, title, description }: Args) => {
    return apiPatch<{ note: Note }>(`/api/notes/${_id}`, {
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }, []);

  return { updateNote };
};
