'use client';

import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Input, Textarea } from '@nextui-org/react';
import { useTitleInput } from './hooks/useTitleInput';
import { useDescriptionInput } from './hooks/useDescriptionInput';
import { usePostNote } from '~/hooks/Note/usePostNote';
import { URLS } from '~/constants/urls';

export const CreateNoteCard: FC = () => {
  const {
    value: title,
    changeValue: changeTitle,
    isError: isErrorTitle,
    isDirty: isDirtyTitle,
    helperText: helperTextTitle,
  } = useTitleInput();
  const {
    value: description,
    changeValue: changeDescription,
    isError: isErrorDescription,
    helperText: helperTextDescription,
  } = useDescriptionInput();

  const [isLoading, setIsLoading] = useState(false);
  const { postNote } = usePostNote();
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    await postNote({ title, description })
      .then((data) => {
        router.push(URLS.QUESTION_DETAIL(data.note._id));
      })
      .finally(() => setIsLoading(false));
  }, [postNote, title, description, router]);

  return (
    <Card className="w-[100%] max-w-[500px] p-[40px] flex flex-col gap-[24px]" shadow="sm">
      <h4>ノートを作成する</h4>
      <div className="flex flex-col gap-[16px]">
        <Input
          label="タイトル"
          onValueChange={changeTitle}
          isInvalid={isDirtyTitle && isErrorTitle}
          errorMessage={isDirtyTitle && helperTextTitle}
        />
        <Textarea label="説明" onValueChange={changeDescription} isInvalid={isErrorDescription} errorMessage={helperTextDescription} />
      </div>
      <Button color="primary" onClick={handleSubmit} isDisabled={isLoading || isErrorTitle || isErrorDescription}>
        作成
      </Button>
    </Card>
  );
};
