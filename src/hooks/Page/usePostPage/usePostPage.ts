import { useCallback } from 'react';
import { restClient } from '~/libs/restClient';

export const usePostPage = () => {
  const postPage = useCallback(async ({ url, noteId }: { url: string; noteId: string }) => {
    return restClient.apiPost('/api/pages', { body: JSON.stringify({ url, noteId }) });
  }, []);

  return { postPage };
};
