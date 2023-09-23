'use client';

import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import { URLS } from '~/constants/urls';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';

type Props = {
  children: ReactNode;
};

export const LoginRequiredWrapper: FC<Props> = ({ children }) => {
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingCurrentUser || currentUser) {
      return;
    }
    router.push(`${URLS.TOP}?isRedirect=true`);
  }, [currentUser, isLoadingCurrentUser, router]);

  if (isLoadingCurrentUser)
    return (
      <div className="w-100 flex justify-center py-[16px]">
        <Spinner size="lg" color="secondary" />
      </div>
    );

  if (!currentUser) return null;

  return <>{children}</>;
};
