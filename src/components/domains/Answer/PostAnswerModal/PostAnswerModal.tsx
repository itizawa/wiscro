'use client';

import { FC } from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { Question } from '~/domains/Question';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  question: Question;
};

export const PostAnswerModal: FC<Props> = ({ isOpen, onOpenChange, question }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" hideCloseButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">回答する</ModalHeader>
            <ModalBody>
              <p>{question.title}</p>
              <p>{question.description}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                閉じる
              </Button>
              <Button color="primary" onPress={onClose}>
                回答する
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
