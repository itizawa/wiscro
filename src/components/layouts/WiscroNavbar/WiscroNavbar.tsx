'use client';

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import { URLS } from '~/constants/urls';

export const WiscroNavbar = () => {
  return (
    <Navbar shouldHideOnScroll isBordered isBlurred={false}>
      <NavbarBrand>
        <Link href="/" color="foreground">
          Wiscro
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href={URLS.QUESTION_NEW} variant="flat">
            作成
          </Button>
          <Button as={Link} color="primary" href={URLS.LOGIN_TO_BACKEND} variant="flat">
            ログイン
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
