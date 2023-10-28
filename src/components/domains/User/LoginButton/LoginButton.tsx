'use client';

import { Button } from '@nextui-org/button';
import { FC, useEffect } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { LoginModal } from '../LoginModal';
import { apiGetForC } from '~/app/restClient/restClientForC';

export const LoginButton: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    apiGetForC('/api/me');
  }, []);

  return (
    <>
      <Button color="primary" onClick={onOpen} variant="flat">
        ログイン
      </Button>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
