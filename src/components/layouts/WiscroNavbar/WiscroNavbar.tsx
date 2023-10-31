'use server';

import React, { FC } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import urlJoin from 'url-join';
import { LoginButton } from '~/components/domains/User/LoginButton';
import { PersonalDropdown } from '~/components/domains/User/PersonalDropdown';
import { getAllCookies } from '~/app/actions/getAllCookies';

export const WiscroNavbar: FC = async () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Credentials': 'true',
    cookie: getAllCookies(),
  };

  const init: RequestInit = {
    method: 'GET',
    headers,
    credentials: 'include',
    cache: 'no-cache',
  };

  const response = await fetch(urlJoin(process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.wiscro.app/', '/api/me'), init).catch((error) => {
    console.error(error);
    throw new Error(error);
  });
  const { currentUser } = await response.json();

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
