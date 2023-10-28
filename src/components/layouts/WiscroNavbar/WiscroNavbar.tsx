'use client';

import React, { FC } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@nextui-org/react';
import { LoginButton } from '~/components/domains/User/LoginButton';
import { User } from '~/domains/User';
import { PersonalDropdown } from '~/components/domains/User/PersonalDropdown';

export const WiscroNavbar: FC<{ currentUser: User }> = ({ currentUser }) => {
  return (
    <>
      <Navbar isBordered isBlurred={false}>
        <NavbarBrand>
          <Link href="/" color="foreground" className="font-bold">
            Wiscro
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>{currentUser ? <PersonalDropdown currentUser={currentUser} /> : <LoginButton />}</NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};
