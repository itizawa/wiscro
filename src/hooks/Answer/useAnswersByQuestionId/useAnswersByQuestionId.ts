import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { Answer } from '~/domains/Answer';
import { restClient } from '~/libs/restClient';

const getKey = (questionId: string) => `/api/questions/${questionId}/answers`;

export const useAnswersByQuestionId = ({ questionId, fallbackData }: { questionId: string; fallbackData: Answer[] }) => {
  return useSWR(getKey(questionId), (endpoint) => restClient.apiGet<{ answers: Answer[] }>(endpoint).then((res) => res.answers), {
    fallbackData,
    refreshInterval: 5000,
  });
};

export const useMutateAnswersByQuestionId = () => {
  const mutateAnswersByQuestionId = useCallback((questionId: string) => {
    mutate(getKey(questionId));
  }, []);

  return { mutateAnswersByQuestionId };
};
