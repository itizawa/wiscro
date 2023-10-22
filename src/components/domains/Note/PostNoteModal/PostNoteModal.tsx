'use client';

import { FC, useCallback, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { usePostNote } from '~/hooks/Note/usePostNote';
import { URLS } from '~/constants/urls';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

interface IFormInput {
  title: string;
  description: string;
}

export const PostNoteModal: FC<Props> = ({ isOpen, onOpenChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { postNote } = usePostNote();
  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleOpenChange = useCallback(() => {
    reset();
    onOpenChange();
  }, [onOpenChange, reset]);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      if (isLoading) return;
      setIsLoading(true);
      postNote({ title: data.title, description: data.description })
        .then((data) => {
          handleOpenChange();
          router.push(URLS.NOTE_DETAIL(data.note._id));
        })
        .catch((error) => {
          // TODO: 本来はコンソールに出すのではなく、ユーザーにエラーを通知する
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    },
    [handleOpenChange, isLoading, postNote, router],
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement="center" hideCloseButton>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">ノートを作成する</ModalHeader>
          <ModalBody>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="タイトル"
                  isInvalid={fieldState.isDirty && field.value.length === 0}
                  errorMessage={fieldState.isDirty && field.value.length === 0 && 'タイトルを入力してください'}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  label="説明"
                  isInvalid={fieldState.isDirty && field.value.length === 0}
                  errorMessage={fieldState.isDirty && field.value.length === 0 && 'タイトルを入力してください'}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={handleSubmit(onSubmit)}
              isDisabled={watch('description').length === 0 || watch('description').length === 0}
              isLoading={isLoading}
            >
              ノートを作成する
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
