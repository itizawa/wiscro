'use client';

import { FC } from 'react';
import { Card } from '@nextui-org/react';
import { Question } from '~/domains/Question';

type Props = {
  question: Question;
};

export const QuestionCard: FC<Props> = ({ question }) => {
  return (
    <Card className="w-[100%] max-w-[500px] p-[40px] flex flex-col gap-[24px]" shadow="sm">
      <h4>{question.title}</h4>
      <p>{question.description}</p>
    </Card>
  );
};
