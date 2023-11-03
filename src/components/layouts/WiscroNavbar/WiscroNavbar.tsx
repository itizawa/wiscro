import React, { FC } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { LoginButton } from '~/components/domains/User/LoginButton';
import { PersonalDropdown } from '~/components/domains/User/PersonalDropdown';
import { User } from '~/domains/User';
import { apiGet } from '~/app/restClient';

export const WiscroNavbar: FC = async () => {
  const { currentUser } = await apiGet<{ currentUser: User }>('/api/me', { cache: 'no-cache' });

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
