import type { NextPage } from 'next';

import { CreateQuestionCard } from '~/components/domains/Question/CreateQuestionCard';

const NextPage: NextPage = () => {
  return (
    <div className="py-3">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CreateQuestionCard />
      </div>
    </div>
  );
};

export default NextPage;
