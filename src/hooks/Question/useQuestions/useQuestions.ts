import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { Question } from '~/domains/Question';
import { restClient } from '~/libs/restClient';

const getKey = () => `/api/questions`;

export const useQuestions = () => {
  return useSWR(getKey(), (endpoint) => restClient.apiGet<{ questions: Question[] }>(endpoint).then((res) => res.questions));
};

export const useMutateQuestions = () => {
  const mutateQuestions = useCallback(() => {
    mutate(getKey());
  }, []);

  return { mutateQuestions };
};
