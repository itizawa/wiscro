'use client';

import { FC, useCallback, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Question } from '~/domains/Question';
import { isValidUrl } from '~/utils/isValidUrl/isValidUrl';
import { usePostAnswer } from '~/hooks/Answer/usePostAnswer';
import { useMutateAnswersByQuestionId } from '~/hooks/Answer/useAnswersByQuestionId/useAnswersByQuestionId';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  question: Question;
};

interface IFormInput {
  url: string;
}

export const PostAnswerModal: FC<Props> = ({ isOpen, onOpenChange, question }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      url: '',
    },
  });
  const { mutateAnswersByQuestionId } = useMutateAnswersByQuestionId();
  const { postAnswer } = usePostAnswer();
  const handleOpenChange = useCallback(() => {
    reset();
    onOpenChange();
  }, [onOpenChange, reset]);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      if (isLoading) return;
      setIsLoading(true);
      postAnswer({ url: data.url, questionId: question._id })
        .catch((error) => {
          // TODO: 本来はコンソールに出すのではなく、ユーザーにエラーを通知する
          console.error(error);
        })
        .then(() => {
          mutateAnswersByQuestionId(question._id);
          handleOpenChange();
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [handleOpenChange, isLoading, mutateAnswersByQuestionId, postAnswer, question._id],
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement="center" hideCloseButton>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">回答する</ModalHeader>
          <ModalBody>
            <p>{question.title}</p>
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
