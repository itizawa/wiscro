'use client';

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Spinner, Avatar, useDisclosure } from '@nextui-org/react';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';
import { PostNoteModal } from '~/components/domains/Note/PostNoteModal';
import { LoginButton } from '~/components/domains/User/LoginButton';

export const WiscroNavbar = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Navbar shouldHideOnScroll isBordered isBlurred={false}>
        <NavbarBrand>
          <Link href="/" color="foreground" className="font-bold">
            Wiscro
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          {isLoading ? (
            <Spinner />
          ) : (
            <NavbarItem>
              {currentUser ? (
                <div className="flex gap-[16px]">
                  <Button color="primary" onClick={onOpen}>
                    ノートを作成する
                  </Button>
                  <Avatar src={currentUser.profileUrl} isBordered />
                </div>
              ) : (
                <LoginButton />
              )}
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
      <PostNoteModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
