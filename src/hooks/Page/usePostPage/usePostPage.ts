import { useCallback } from 'react';
import { apiPost } from '~/app/restClient';

export const usePostPage = () => {
  const postPage = useCallback(async ({ url, noteId }: { url: string; noteId: string }) => {
    return apiPost('/api/pages', { body: JSON.stringify({ url, noteId }) });
  }, []);

  return { postPage };
};
