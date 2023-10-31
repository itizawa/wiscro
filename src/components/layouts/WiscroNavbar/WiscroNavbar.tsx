'use client';

import React, { FC } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { Spinner } from '@nextui-org/react';
import { LoginButton } from '~/components/domains/User/LoginButton';
import { PersonalDropdown } from '~/components/domains/User/PersonalDropdown';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';

export const WiscroNavbar: FC = () => {
  const { data: currentUser, isLoading } = useCurrentUser();

  return (
    <>
      <Navbar isBordered isBlurred={false}>
        <NavbarBrand>
          <Link href="/" color="foreground" className="font-bold">
            Wiscro
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          {isLoading ? (
            <Spinner />
          ) : (
            <NavbarItem>{currentUser ? <PersonalDropdown currentUser={currentUser} /> : <LoginButton />}</NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
};
