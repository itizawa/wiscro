import useSWR, { SWRResponse } from 'swr';
import { User } from '~/domains/User';
import { restClient } from '~/libs/restClient';

/**
 * 現在ログインしているユーザーを返すswr
 * @returns {User} currentUser
 */
export const useCurrentUser = (): SWRResponse<User, Error> => {
  return useSWR('/api/me', (endpoint) => restClient.apiGet<{ currentUser: User }>(endpoint).then((res) => res.currentUser));
};
