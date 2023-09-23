import { CreateQuestionCard } from '~/components/domains/Question/CreateQuestionCard';
import { LoginRequiredWrapper } from '~/components/layouts/LoginRequiredWrapper';

export default async function Page() {
  return (
    <LoginRequiredWrapper>
      <div className="flex justify-center pt-[24px]">
        <CreateQuestionCard />
      </div>
    </LoginRequiredWrapper>
  );
}
