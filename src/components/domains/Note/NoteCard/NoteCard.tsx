'use client';

import Link from 'next/link';

import { FC } from 'react';
import { Button, Card, useDisclosure } from '@nextui-org/react';
import { format } from 'date-fns';
import { EditNoteModal } from '../EditNoteModal';
import { Note } from '~/domains/Note';
import { URLS } from '~/constants/urls';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';

type Props = {
  note: Note;
};

export const NoteCard: FC<Props> = ({ note }) => {
  const { data: currentUser } = useCurrentUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="w-[100%] max-w-[400px] p-[16px] flex flex-col" shadow="sm">
        <h4 className="font-bold text-lg mb-[8px]">
          <Link href={URLS.NOTE_DETAIL(note._id)}>{note.title}</Link>
        </h4>
        {note.latestPostPageAt && (
          <p className="text-slate-600 text-sm mb-[16px]">更新日：{format(new Date(note.latestPostPageAt), 'yyyy/MM/dd HH:mm')}</p>
        )}
        <p>{note.description}</p>
        {note.createdUserId === currentUser?._id && (
          <Button className="mt-[24px]" size="sm" color="primary" variant="ghost" onClick={onOpen}>
            更新
          </Button>
        )}
      </Card>
      <EditNoteModal isOpen={isOpen} onOpenChange={onOpenChange} note={note} />
    </>
  );
};
