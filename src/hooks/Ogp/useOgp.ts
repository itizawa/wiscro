import useSWR, { SWRResponse } from 'swr';
import { Ogp } from '../../domains/shared';
import { apiGet } from '~/app/restClient';

/**
 * urlをもとにOGPを取得するSWR
 * @param url
 */
export const useOgp = (url?: string): SWRResponse<Ogp, Error> => {
  const key = url ? `/ogps?url=${url}` : null;
  return useSWR(key, (endpoint: string) =>
    apiGet<{ ogp: Ogp }>(endpoint).then((result) => {
      return new Ogp(result.ogp);
    }),
  );
};
