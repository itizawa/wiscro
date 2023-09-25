import { useCallback } from 'react';
import { restClient } from '~/libs/restClient';

export const usePostAnswer = () => {
  const postAnswer = useCallback(async (url: string) => {
    return restClient.apiPost('/api/answer', { url });
  }, []);

  return { postAnswer };
};
