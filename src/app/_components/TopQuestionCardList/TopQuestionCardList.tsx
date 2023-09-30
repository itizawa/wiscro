'use client';

import { FC } from 'react';
import { Spinner } from '@nextui-org/react';
import { TopQuestionCard } from '../TopQuestionCard/TopQuestionCard';
import { useQuestions } from '~/hooks/Question/useQuestions';

export const TopQuestionCardList: FC = () => {
  const { data: questions = [], isLoading: isLoadingQuestions } = useQuestions();
  console.log(questions);

  return (
    <div className="flex justify-center items-center flex-col gap-[24px] pt-[24px] pb-[80px] px-3">
      {isLoadingQuestions ? (
        <Spinner />
      ) : (
        <>
          {questions.map((question) => (
            <TopQuestionCard key={question._id} question={question} />
          ))}
        </>
      )}
    </div>
  );
};
