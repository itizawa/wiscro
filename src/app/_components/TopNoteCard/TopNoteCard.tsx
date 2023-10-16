'use client';

import Link from 'next/link';

import { FC, useCallback, useState } from 'react';
import { Avatar, AvatarIcon, Button, Card, Input } from '@nextui-org/react';
import { format } from 'date-fns';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Note } from '~/domains/Note';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';
import { URLS } from '~/constants/urls';
import { isValidUrl } from '~/utils/isValidUrl';
import { usePostPage } from '~/hooks/Page/usePostPage';

type Props = {
  note: Note;
};

interface IFormInput {
  url: string;
}

export const TopNoteCard: FC<Props> = ({ note }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: currentUser } = useCurrentUser();
  const { postPage } = usePostPage();

  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      url: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      if (isLoading) return;
      setIsLoading(true);
      postPage({ url: data.url, noteId: note._id })
        .then(() => {
          reset();
        })
        .catch((error) => {
          // TODO: 本来はコンソールに出すのではなく、ユーザーにエラーを通知する
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [isLoading, postPage, note._id, reset],
  );

  return (
    <Card className="w-[100%] max-w-[400px] p-[16px] flex flex-col" shadow="sm">
      <h4 className="font-bold text-lg mb-[8px]">
        <Link href={URLS.QUESTION_DETAIL(note._id)}>{note.title}</Link>
      </h4>
      <p className="text-slate-600 text-sm mb-[16px]">投稿日：{format(new Date(note.createdAt), 'yyyy/MM/dd HH:mm')}</p>
      <p>{note.description}</p>
      {currentUser && (
        <div className="flex justify-between items-center mt-[24px] pt-[16px] border-t-2 gap-[8px] pb-[16px]">
          <Avatar size="sm" icon={<AvatarIcon />} src={currentUser?.profileUrl} isBordered />
          <div className="flex-1">
            <Controller
              name="url"
              control={control}
              rules={{
                validate: (value) => isValidUrl(value),
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  size="sm"
                  className="h-[32px]"
                  placeholder="ページのURL"
                  isInvalid={fieldState.isDirty && !isValidUrl(field.value)}
                  errorMessage={fieldState.isDirty && !isValidUrl(field.value) && 'URLの形式が正しくありません'}
                />
              )}
            />
          </div>
          <Button
            size="sm"
            className=""
            color="primary"
            onClick={handleSubmit(onSubmit)}
            isDisabled={!isValidUrl(watch('url'))}
            isLoading={isLoading}
          >
            ページを追加する
          </Button>
        </div>
      )}
    </Card>
  );
};
