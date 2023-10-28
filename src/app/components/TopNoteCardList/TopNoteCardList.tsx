import { FC } from 'react';
import { TopNoteCard } from '../TopNoteCard/TopNoteCard';
import { fetchNotes } from '~/app/actions/noteActions';

export const TopNoteCardList: FC = async () => {
  const { notes } = await fetchNotes();

  return (
    <div className="flex justify-center items-center flex-col gap-[24px] md:py-[80px] py-[40px] px-3">
      <h1 className="text-2xl">最近更新されたNote</h1>
      <div className="grid grid-cols-2 gap-[24px] w-full max-w-[824px]">
        {notes.map((note) => (
          <div key={note._id} className="col-span-2 md:col-span-1">
            <TopNoteCard note={note} />
          </div>
        ))}
      </div>
    </div>
  );
};
