// app/page.tsx
import { TopQuestionCard } from './_components/TopQuestionCard';
import { Question } from '~/domains/Question';
import { restClient } from '~/libs/restClient';

export default async function Page() {
  const { questions = [] } = await restClient.apiGet<{ questions: Question[] }>('/api/questions');
  return (
    <div className="flex justify-center items-center flex-col gap-[24px] pt-[24px] px-3">
      {questions.map((question) => (
        <TopQuestionCard key={question._id} question={question} />
      ))}
    </div>
  );
}
