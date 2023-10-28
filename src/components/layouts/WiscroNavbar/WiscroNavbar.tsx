import React, { FC } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { LoginButton } from '~/components/domains/User/LoginButton';
import { PersonalDropdown } from '~/components/domains/User/PersonalDropdown';
import { fetchMe } from '~/app/actions/userActions';

export const WiscroNavbar: FC = async () => {
  const { currentUser } = await fetchMe();

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
