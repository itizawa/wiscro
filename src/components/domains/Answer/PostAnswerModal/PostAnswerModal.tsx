'use client';

import { FC } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Question } from '~/domains/Question';
import { isValidUrl } from '~/utils/isValidUrl/isValidUrl';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  question: Question;
};

interface IFormInput {
  url: string;
}

export const PostAnswerModal: FC<Props> = ({ isOpen, onOpenChange, question }) => {
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      url: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data, 27);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" hideCloseButton>
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
            <Button color="primary" onClick={handleSubmit(onSubmit)} isDisabled={!isValidUrl(watch('url'))}>
              回答する
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
