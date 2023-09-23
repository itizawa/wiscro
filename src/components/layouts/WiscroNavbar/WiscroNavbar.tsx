'use client';

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Spinner, Avatar } from '@nextui-org/react';
import { URLS } from '~/constants/urls';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';

export const WiscroNavbar = () => {
  const { data: currentUser, isLoading } = useCurrentUser();

  return (
    <Navbar shouldHideOnScroll isBordered isBlurred={false}>
      <NavbarBrand>
        <Link href="/" color="foreground">
          Wiscro
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {isLoading ? (
          <Spinner />
        ) : (
          <NavbarItem>
            {currentUser ? (
              <Avatar src={currentUser.profileUrl} isBordered />
            ) : (
              <Button as={Link} color="primary" href={URLS.LOGIN_TO_BACKEND} variant="flat">
                ログイン
              </Button>
            )}
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};
