'use client';

import { useRouter } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import { fetchMe } from '~/app/actions/userActions';
import { URLS } from '~/constants/urls';

type Props = {
  children: ReactNode;
};

export const LoginRequiredWrapper: FC<Props> = async ({ children }) => {
  const { currentUser } = await fetchMe();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      return;
    }
    router.push(`${URLS.TOP}?isRedirect=true`);
  }, [currentUser, router]);

  if (!currentUser) return null;

  return <>{children}</>;
};
