'use client';

import { Button } from '@nextui-org/button';
import { FC } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { LoginModal } from '../LoginModal';

export const LoginButton: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onClick={onOpen} variant="flat">
        ログイン
      </Button>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
