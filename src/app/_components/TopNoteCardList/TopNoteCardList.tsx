'use client';

import { FC } from 'react';
import { Spinner } from '@nextui-org/react';
import { TopNoteCard } from '../../../components/domains/Note/NoteCard/NoteCard';
import { useNotes } from '~/hooks/Note/useNotes';

export const TopNoteCardList: FC = () => {
  const { data: notes = [], isLoading: isLoadingNotes } = useNotes();

  return (
    <div className="flex justify-center items-center flex-col gap-[24px] md:py-[80px] py-[40px] px-3">
      <h1 className="text-2xl">最近更新されたNote</h1>
      {isLoadingNotes ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 gap-[24px] w-full max-w-[824px]">
          {notes.map((note) => (
            <div key={note._id} className="col-span-2 md:col-span-1">
              <TopNoteCard note={note} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
