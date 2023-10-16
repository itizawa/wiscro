'use client';

import { FC } from 'react';
import { Spinner } from '@nextui-org/react';
import { TopNoteCard } from '../TopNoteCard/TopNoteCard';
import { useNotes } from '~/hooks/Note/useNotes';

export const TopNoteCardList: FC = () => {
  const { data: notes = [], isLoading: isLoadingNotes } = useNotes();

  return (
    <div className="flex justify-center items-center flex-col gap-[24px] pt-[24px] pb-[80px] px-3">
      {isLoadingNotes ? (
        <Spinner />
      ) : (
        <>
          {notes.map((note) => (
            <TopNoteCard key={note._id} note={note} />
          ))}
        </>
      )}
    </div>
  );
};
