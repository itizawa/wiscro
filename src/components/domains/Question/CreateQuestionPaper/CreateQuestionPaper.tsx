import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useTitleInput } from './hooks/useTitleInput';
import { useDescriptionInput } from './hooks/useDescriptionInput';
import { usePostQuestion } from '~/hooks/Question/usePostQuestion';
import { URLS } from '~/constants/urls';

export const CreateQuestionPaper: FC = () => {
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
    <Paper sx={{ padding: '40px', width: '100%', maxWidth: '500px' }}>
      <Typography variant="h4" textAlign="center">
        質問を作成する
      </Typography>
      <Box display="flex" flexDirection="column" rowGap={2} mt={4}>
        <TextField
          onChange={(e) => changeTitle(e.target.value)}
          label="タイトル"
          variant="outlined"
          error={isDirtyTitle && isErrorTitle}
          helperText={isDirtyTitle && helperTextTitle}
        />
        <TextField
          label="説明"
          multiline
          onChange={(e) => changeDescription(e.target.value)}
          minRows={3}
          maxRows={5}
          error={isErrorDescription}
          helperText={helperTextDescription}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          sx={{ marginTop: '32px', width: '160px' }}
          variant="contained"
          color="warning"
          onClick={handleSubmit}
          disabled={isLoading || isErrorTitle || isErrorDescription}
        >
          作成
        </Button>
      </Box>
    </Paper>
  );
};
