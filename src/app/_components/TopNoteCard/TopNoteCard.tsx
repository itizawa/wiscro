'use client';

import Link from 'next/link';

import { FC } from 'react';
import { Card } from '@nextui-org/react';
import { format } from 'date-fns';
import { Note } from '~/domains/Note';
import { URLS } from '~/constants/urls';

type Props = {
  note: Note;
};

export const TopNoteCard: FC<Props> = ({ note }) => {
  return (
    <Card className="w-[100%] max-w-[400px] p-[16px] flex flex-col" shadow="sm">
      <h4 className="font-bold text-lg mb-[8px]">
        <Link href={URLS.NOTE_DETAIL(note._id)}>{note.title}</Link>
      </h4>
      {note.latestPostPageAt && (
        <p className="text-slate-600 text-sm mb-[16px]">更新日：{format(new Date(note.latestPostPageAt), 'yyyy/MM/dd HH:mm')}</p>
      )}
      <p>{note.description}</p>
    </Card>
  );
};
