'use server';

import { apiGet } from '~/app/restClient';
import { API_ME } from '~/constants/apiUrls';
import { User } from '~/domains/User';

export const fetchMe = async () => {
  return await apiGet<{ currentUser: User }>(API_ME(), {
    next: { tags: [API_ME()] },
  });
};
