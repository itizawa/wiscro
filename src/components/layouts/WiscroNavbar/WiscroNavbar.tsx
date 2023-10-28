'use client';

import React, { FC } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar, useDisclosure } from '@nextui-org/react';
import { LoginButton } from '~/components/domains/User/LoginButton';
import { Icon } from '~/components/uiParts/icons';
import { EditNoteModal } from '~/components/domains/Note/EditNoteModal';
import { User } from '~/domains/User';

export const WiscroNavbar: FC<{ currentUser: User }> = ({ currentUser }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Navbar isBordered isBlurred={false}>
        <NavbarBrand>
          <Link href="/" color="foreground" className="font-bold">
            Wiscro
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            {currentUser ? (
              <div className="flex gap-[16px]">
                <Button color="primary" className="color-[6366f1]" onClick={onOpen}>
                  <Icon icon="BOOK" />
                  作成する
                </Button>
                <Avatar src={currentUser.profileUrl} isBordered />
              </div>
            ) : (
              <LoginButton />
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <EditNoteModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
