import { QuestionCard } from '~/components/domains/Question/QuestionCard';
import { Question } from '~/domains/Question';
import { restClient } from '~/libs/restClient';

export async function generateStaticParams() {
  // TODO: 新着の質問は予め静的サイト生成しておく
  return [];
}

export default async function Page({ params }: { params: { id: string } }) {
  const { question } = await restClient.apiGet<{ question: Question }>(`/api/questions/${params.id}`);

  return (
    <div className="flex justify-center pt-[24px] px-3">
      <QuestionCard question={question} />
    </div>
  );
}
