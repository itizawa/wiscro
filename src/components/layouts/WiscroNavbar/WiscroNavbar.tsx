'use client';

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Spinner, Avatar, useDisclosure } from '@nextui-org/react';
import { URLS } from '~/constants/urls';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';
import { PostQuestionModal } from '~/components/domains/Question/PostQuestionModal';

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
                    質問する
                  </Button>
                  <Avatar src={currentUser.profileUrl} isBordered />
                </div>
              ) : (
                <Button as={Link} color="primary" href={URLS.LOGIN_TO_BACKEND} variant="flat">
                  ログイン
                </Button>
              )}
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
      <PostQuestionModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
