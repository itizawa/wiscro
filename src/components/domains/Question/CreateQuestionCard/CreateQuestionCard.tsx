'use client';

import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Input, Textarea } from '@nextui-org/react';
import { useTitleInput } from './hooks/useTitleInput';
import { useDescriptionInput } from './hooks/useDescriptionInput';
import { usePostQuestion } from '~/hooks/Question/usePostQuestion';
import { URLS } from '~/constants/urls';

export const CreateQuestionCard: FC = () => {
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
  const { postQuestion } = usePostQuestion();
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    await postQuestion({ title, description })
      .then((question) => {
        router.push(URLS.QUESTION_DETAIL(question._id));
      })
      .finally(() => setIsLoading(false));
  }, [postQuestion, title, description, router]);

  return (
    <Card className="w-[100%] max-w-[500px] p-[40px] flex flex-col gap-[24px]" shadow="sm">
      <h4>質問を作成する</h4>
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
