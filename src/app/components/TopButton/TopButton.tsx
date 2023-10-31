'use client';

import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { FC } from 'react';
import { EditNoteModal } from '~/components/domains/Note/EditNoteModal';
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
          ノートを作成する
        </Button>
      </div>
      <EditNoteModal isOpen={isOpenPostNoteModal} onOpenChange={onOpenChangePostNoteModal} />
      <LoginModal isOpen={isOpenLoginModal} onOpenChange={onOpenChangeLoginModal} />
    </>
  );
};
