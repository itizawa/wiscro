import useSWR, { SWRResponse } from 'swr';
import { Page } from '../../../domains/Page';
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
        return result.pages.map((page) => new Page(page));
      }),
    {
      fallbackData: initialValue,
    },
  );
};
