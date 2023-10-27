// app/page.tsx
import { Image } from '@nextui-org/image';
import { TopNoteCardList } from './_components/TopNoteCardList';
import { TopButton } from './_components/TopButton/TopButton';
import { apiGet } from './restClient';
import { Note } from '~/domains/Note';

export default async function Page() {
  const { notes } = await apiGet<{ notes: Note[] }>(`/api/notes`, { next: { revalidate: 60 } });

  return (
    <>
      <div className="bg-white drop-shadow-sm">
        <div className="min-h-[500px] max-w-[1024px] mx-auto flex flex-col-reverse md:flex-row justify-center gap-[16px] md:gap-[48px]">
          <div className="flex flex-col justify-center px-[16px] pb-[32px]">
            <h1 className="text-2xl font-bold mb-[8px]">あなたの切り口で記事をまとめよう</h1>
            <p className="text-slate-600 mb-[4px]">WiscroはURLをまとめたページを気軽に作れるアプリケーションです。</p>
            <p className="text-slate-600 mb-[24px]">情報の整理や共有にお使いください。</p>
            <TopButton />
          </div>
          <div className="flex flex-col justify-center text-center px-[32px] py-[16px]">
            <Image src="/images/top.png" width="100%" height="auto" alt={'トップのイメージ'} />
          </div>
        </div>
      </div>
      <TopNoteCardList notes={notes} />
    </>
  );
}
