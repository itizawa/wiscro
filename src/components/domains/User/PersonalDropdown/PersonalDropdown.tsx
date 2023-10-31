'use client';

import { FC } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, useDisclosure } from '@nextui-org/react';
import { EditNoteModal } from '../../Note/EditNoteModal';
import { Icon } from '~/components/uiParts/icons';
import { User } from '~/domains/User';

export const PersonalDropdown: FC<{ currentUser: User }> = ({ currentUser }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Avatar className="cursor-pointer" src={currentUser.profileUrl} isBordered />
        </DropdownTrigger>
        <DropdownMenu variant="faded">
          <DropdownItem onClick={onOpen} key="new" startContent={<Icon icon="BOOK" />}>
            ノートを作成する
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <EditNoteModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
