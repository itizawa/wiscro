import { AnswerList } from './_components/AnswerList';
import { QuestionCard } from '~/components/domains/Question/QuestionCard';
import { Answer } from '~/domains/Answer';
import { Question } from '~/domains/Question';
import { restClient } from '~/libs/restClient';

export async function generateStaticParams() {
  // TODO: 新着の質問は予め静的サイト生成しておく
  return [];
}

export default async function Page({ params }: { params: { id: string } }) {
  const { question } = await restClient.apiGet<{ question: Question }>(`/api/questions/${params.id}`);
  const { answers } = await restClient.apiGet<{ answers: Answer[] }>(`/api/questions/${params.id}/answers`);

  return (
    <div className="flex justify-center items-center flex-col gap-[24px] pt-[24px] px-3 pb-[100px]">
      <QuestionCard question={question} />
      <AnswerList questionId={question._id} answers={answers} />
    </div>
  );
}
