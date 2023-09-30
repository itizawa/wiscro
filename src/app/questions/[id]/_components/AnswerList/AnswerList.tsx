'use client';

import { FC } from 'react';
import { AnswerCard } from '~/components/domains/Answer/AnswerCard';
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
    <div className="w-[100%] max-w-[400px] flex flex-col gap-[16px]">
      {answers.map((answer) => {
        return <AnswerCard key={answer._id} answer={answer} />;
      })}
    </div>
  );
};
