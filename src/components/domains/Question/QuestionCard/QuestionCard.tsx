'use client';

import { FC } from 'react';
import { Card } from '@nextui-org/react';
import { format } from 'date-fns';
import { Question } from '~/domains/Question';

type Props = {
  question: Question;
};

export const QuestionCard: FC<Props> = ({ question }) => {
  return (
    <Card className="w-[100%] max-w-[500px] p-[40px] flex flex-col" shadow="sm">
      <h4 className="font-bold text-lg mb-[8px]">{question.title}</h4>
      <p className="text-slate-600 text-sm mb-[16px]">投稿日：{format(new Date(question.createdAt), 'yyyy/MM/dd HH:mm')}</p>
      <p>{question.description}</p>
    </Card>
  );
};
