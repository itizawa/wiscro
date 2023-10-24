'use client';

import { FC, useCallback } from 'react';
import { Image, Link, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
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
        <ModalHeader>ようこそ Wiscro へ！</ModalHeader>
        <ModalBody className="pb-[24px] items-center">
          <p className="mb-[4px]">ノートを作成してページをまとめましょう</p>
          <Link href={URLS.LOGIN_TO_BACKEND}>
            <Image className="mx-auto" src="/images/sign-in-google.png" width={200} />
          </Link>
          <p className="text-slate-600">
            ログインする前に、
            <a href="https://www.wiscro.app/terms" className="text-sky-500">
              利用規約
            </a>
            および
            <a href="https://www.wiscro.app/policy" className="text-sky-500">
              プライバシーポリシー
            </a>
            に同意してください。
          </p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
