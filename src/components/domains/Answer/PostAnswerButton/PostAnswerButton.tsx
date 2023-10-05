import { Button } from '@nextui-org/button';
import { FC } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { PostAnswerModal } from '../PostAnswerModal';
import { Question } from '~/domains/Question';

export const PostAnswerButton: FC<{ question: Question }> = ({ question }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onClick={onOpen}>
        回答する
      </Button>
      <PostAnswerModal isOpen={isOpen} onOpenChange={onOpenChange} question={question} />
    </>
  );
};
