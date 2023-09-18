import { Box } from '@mui/material';
import type { NextPage } from 'next';
import { CreateQuestionPaper } from '~/components/domains/Question/CreateQuestionPaper';

const NextPage: NextPage = () => {
  return (
    <Box py={5}>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <CreateQuestionPaper />
      </Box>
    </Box>
  );
};

export default NextPage;
