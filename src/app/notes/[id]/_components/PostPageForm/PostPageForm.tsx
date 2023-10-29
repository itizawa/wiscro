'use client';

import { FC, useCallback, useState } from 'react';
import { Avatar, AvatarIcon, Button, Card, Input } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Note } from '~/domains/Note';
import { isValidUrl } from '~/utils/isValidUrl';
import { Icon } from '~/components/uiParts/icons';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';
import { apiPost } from '~/app/restClient';

type Props = {
  note: Note;
};

interface IFormInput {
  url: string;
}

export const PostPageForm: FC<Props> = ({ note }) => {
  const { data: currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      url: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      if (isLoading) return;
      setIsLoading(true);
      await apiPost('/api/pages', { body: JSON.stringify({ url: data.url, noteId: note._id }) })
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
    [isLoading, note._id, reset],
  );

  if (!currentUser) return;
  if (currentUser._id !== note.createdUserId) return;

  return (
    <Card className="w-[100%] p-[12px] flex flex-col" shadow="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-center gap-[8px]">
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
                onSubmit={handleSubmit(onSubmit)}
                className="h-[32px]"
                placeholder="URL"
                isInvalid={fieldState.isDirty && !isValidUrl(field.value)}
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
          <Icon icon="PENCIL" width={12} height={12} />
          追加
        </Button>
      </form>
    </Card>
  );
};
