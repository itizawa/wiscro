'use client';

import { FC } from 'react';
import { PageCard } from '~/components/domains/Page/PageCard';
import { Page } from '~/domains/Page';
import { usePagesByNoteId } from '~/hooks/Page/usePagesByNoteId';

type Props = {
  noteId: string;
  pages: Page[];
};

export const PageList: FC<Props> = ({ noteId, pages: _pages }) => {
  const { data: pages } = usePagesByNoteId({
    noteId,
    fallbackData: _pages,
  });

  return (
    <div className="w-[100%] max-w-[400px] flex flex-col gap-[16px]">
      {pages.map((page) => {
        return <PageCard key={page._id} page={page} />;
      })}
    </div>
  );
};
