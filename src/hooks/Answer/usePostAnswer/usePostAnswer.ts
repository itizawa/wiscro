import { useCallback } from 'react';
import { restClient } from '~/libs/restClient';

export const usePostAnswer = () => {
  const postAnswer = useCallback(async ({ url, questionId }: { url: string; questionId: string }) => {
    return restClient.apiPost('/api/answers', { body: JSON.stringify({ url, questionId }) });
  }, []);

  return { postAnswer };
};
