import { QuestionCard } from '~/components/domains/Question/QuestionCard';

export async function generateStaticParams() {
  // TODO: 新着の質問は予め静的サイト生成しておく
  return [];
}

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/questions/${params.id}`, { cache: 'force-cache' });
  const data = await res.json();

  return (
    <div className="flex justify-center pt-[24px] px-3">
      <QuestionCard question={data.question} />
    </div>
  );
}
