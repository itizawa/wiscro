'use client';

import { Button } from '@nextui-org/button';
import { FC, useEffect } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { LoginModal } from '../LoginModal';
import { apiGetForC } from '~/app/restClient/restClientForC';

export const LoginButton: FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    apiGetForC('/api/me');
    router.refresh();
  }, [router]);

  return (
    <>
      <Button color="primary" onClick={onOpen} variant="flat">
        ログイン
      </Button>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
