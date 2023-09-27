'use client';

import { FC } from 'react';
import { Answer } from '~/domains/Answer';
import { useAnswersByQuestionId } from '~/hooks/Answer/useAnswersByQuestionId';

type Props = {
  questionId: string;
  answers: Answer[];
};

export const AnswerList: FC<Props> = ({ questionId, answers: _answers }) => {
  const { data: answers } = useAnswersByQuestionId({
    questionId,
    fallbackData: _answers,
  });

  return (
    <div>
      {answers.map((answer) => {
        return <p key={answer._id}>{answer.url}</p>;
      })}
    </div>
  );
};
