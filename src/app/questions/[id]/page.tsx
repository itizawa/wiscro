import { QuestionCard } from '~/components/domains/Question/QuestionCard';
import { restClient } from '~/libs/restClient';

export async function generateStaticParams() {
  // TODO: 新着の質問は予め静的サイト生成しておく
  return [];
}

export default async function Page({ params }: { params: { id: string } }) {
  const res = await restClient.apiGet(`/api/questions/${params.id}`, { cache: 'force-cache' });
  const data = await res.json();

  return (
    <div className="flex justify-center pt-[24px] px-3">
      <QuestionCard question={data.question} />
    </div>
  );
}
