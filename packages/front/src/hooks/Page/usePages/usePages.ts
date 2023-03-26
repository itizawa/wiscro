import { Page } from '@wiscro/common';
import useSWR, { SWRResponse } from 'swr';
import { restClient } from '../../../libs/restClient';

/**
 * ページ一覧を取得するSWR
 * @returns {SWRResponse<Page[]>} pages
 */
export const usePages = (initialValue: Page[]): SWRResponse<Page[]> => {
  return useSWR(
    `/api/pages`,
    (endpoint: string) =>
      restClient.apiGet<{ pages: Page[] }>(endpoint).then((result) => {
        return result.data.pages.map((page) => new Page(page));
      }),
    {
      fallbackData: initialValue,
    },
  );
};
