'use client';

import { FC } from 'react';
import { Avatar, AvatarIcon, Button, Card, useDisclosure } from '@nextui-org/react';
import { format } from 'date-fns';
import { PostAnswerModal } from '../../Answer/PostAnswerModal';
import { LoginButton } from '../../User/LoginButton';
import { Question } from '~/domains/Question';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';

type Props = {
  question: Question;
};

export const QuestionCard: FC<Props> = ({ question }) => {
  const { data: currentUser } = useCurrentUser();
  const { isOpen: isOpenPostAnswerModal, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="w-[100%] max-w-[400px] p-[16px] flex flex-col" shadow="sm">
      <h4 className="font-bold text-lg mb-[8px]">{question.title}</h4>
      <p className="text-slate-600 text-sm mb-[16px]">投稿日：{format(new Date(question.createdAt), 'yyyy/MM/dd HH:mm')}</p>
      <p>{question.description}</p>
      <div className="flex flex-col justify-center items-center mt-[24px] pt-[16px] border-t-2">
        <Avatar icon={<AvatarIcon />} src={currentUser?.profileUrl} isBordered />
        <p className="mt-[16px] text-center">
          {currentUser?.username || 'ゲストユーザー'}さん
          <br />
          この質問に回答してみませんか?
        </p>
        <p className="mt-[4px] text-sm text-slate-400">URLを貼り付けるだけで回答ができます</p>
        {currentUser ? (
          <Button className="mt-[16px]" color="primary" onClick={onOpen}>
            回答する
          </Button>
        ) : (
          <div className="mt-[16px]">
            <LoginButton />
          </div>
        )}
      </div>
      <PostAnswerModal isOpen={isOpenPostAnswerModal} onOpenChange={onOpenChange} question={question} />
    </Card>
  );
};
