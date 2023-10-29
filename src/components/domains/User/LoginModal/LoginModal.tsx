'use client';

import { FC, useCallback } from 'react';
import { Image, Link, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { signIn } from 'next-auth/react';

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
          <div className="cursor-pointer" onClick={() => signIn('google')}>
            <Image className="mx-auto" src="/images/sign-in-google.png" width={200} />
          </div>
          <p className="text-slate-600">
            ログインする前に、
            <Link href="https://www.wiscro.app/terms" className="text-sky-500" target="_blank" rel="noreferrer">
              利用規約
            </Link>
            および
            <Link href="https://www.wiscro.app/policy" className="text-sky-500" target="_blank" rel="noreferrer">
              プライバシーポリシー
            </Link>
            に同意してください。
          </p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
