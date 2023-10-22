'use client';

import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import { FC } from 'react';
import { PostNoteModal } from '~/components/domains/Note/PostNoteModal';
import { LoginModal } from '~/components/domains/User/LoginModal';
import { Icon } from '~/components/uiParts/icons';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';

export const TopButton: FC = () => {
  const { data: currentUser } = useCurrentUser();
  const { isOpen: isOpenPostNoteModal, onOpen: onOpenPostNoteModal, onOpenChange: onOpenChangePostNoteModal } = useDisclosure();
  const { isOpen: isOpenLoginModal, onOpen: onOpenLoginModal, onOpenChange: onOpenChangeLoginModal } = useDisclosure();

  return (
    <>
      <div>
        <Button color="primary" onClick={currentUser ? onOpenPostNoteModal : onOpenLoginModal}>
          <Icon icon="BOOK" />
          ログインしてノートを作成する
        </Button>
      </div>
      <PostNoteModal isOpen={isOpenPostNoteModal} onOpenChange={onOpenChangePostNoteModal} />
      <LoginModal isOpen={isOpenLoginModal} onOpenChange={onOpenChangeLoginModal} />
    </>
  );
};
