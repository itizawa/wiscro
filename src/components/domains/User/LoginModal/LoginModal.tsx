'use client';

import { FC, useCallback } from 'react';
import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { URLS } from '~/constants/urls';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export const LoginModal: FC<Props> = ({ isOpen, onOpenChange }) => {
  const handleOpenChange = useCallback(() => {
    onOpenChange();
  }, [onOpenChange]);

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement="center" hideCloseButton>
      <ModalContent>
        <ModalHeader>ログイン</ModalHeader>
        <ModalBody>
          <p>ログインして質問を作成したり回答したりしましょう</p>
        </ModalBody>
        <ModalFooter>
          <Button as={Link} color="primary" href={URLS.LOGIN_TO_BACKEND} variant="flat">
            ログインする
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
