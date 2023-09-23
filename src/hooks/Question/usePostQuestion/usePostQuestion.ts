import { useCallback } from 'react';
import { Question } from '~/domains/Question';
import { restClient } from '~/libs/restClient';

type Args = Pick<Question, 'description' | 'title'>;

export const usePostQuestion = () => {
  const postQuestion = useCallback(async ({ title, description }: Args) => {
    return restClient.apiPost<{ question: Question }>('/api/questions', {
      title,
      description,
    });
  }, []);

  return { postQuestion };
};
