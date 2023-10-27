import useSWR, { SWRResponse } from 'swr';
import { apiGet } from '~/app/restClient';
import { User } from '~/domains/User';

/**
 * 現在ログインしているユーザーを返すswr
 * @returns {User} currentUser
 */
export const useCurrentUser = (): SWRResponse<User, Error> => {
  return useSWR('/api/me', (endpoint) => apiGet<{ currentUser: User }>(endpoint).then((res) => res.currentUser));
};
