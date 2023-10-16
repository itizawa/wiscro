'use client';

import { FC, useCallback, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Note } from '~/domains/Note';
import { isValidUrl } from '~/utils/isValidUrl/isValidUrl';
import { usePostPage } from '~/hooks/Page/usePostPage';
import { useMutatePagesByNoteId } from '~/hooks/Page/usePagesByNoteId/usePagesByNoteId';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  note: Note;
};

interface IFormInput {
  url: string;
}

export const PostPageModal: FC<Props> = ({ isOpen, onOpenChange, note }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      url: '',
    },
  });
  const { mutatePagesByNoteId } = useMutatePagesByNoteId();
  const { postPage } = usePostPage();
  const handleOpenChange = useCallback(() => {
    reset();
    onOpenChange();
  }, [onOpenChange, reset]);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      if (isLoading) return;
      setIsLoading(true);
      postPage({ url: data.url, noteId: note._id })
        .catch((error) => {
          // TODO: 本来はコンソールに出すのではなく、ユーザーにエラーを通知する
          console.error(error);
        })
        .then(() => {
          mutatePagesByNoteId(note._id);
          handleOpenChange();
          window.setTimeout(() => {
            window.scroll({
              top: document.documentElement.scrollHeight - document.documentElement.clientHeight,
              behavior: 'smooth',
            });
          }, 1000);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [handleOpenChange, isLoading, mutatePagesByNoteId, postPage, note._id],
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement="center" hideCloseButton>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">回答する</ModalHeader>
          <ModalBody>
            <p>{note.title}</p>
            <Controller
              name="url"
              control={control}
              rules={{
                validate: (value) => isValidUrl(value),
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="回答のURL"
                  isInvalid={fieldState.isDirty && !isValidUrl(field.value)}
                  errorMessage={fieldState.isDirty && !isValidUrl(field.value) && 'URLの形式が正しくありません'}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmit(onSubmit)} isDisabled={!isValidUrl(watch('url'))} isLoading={isLoading}>
              回答する
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};