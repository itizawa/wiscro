// app/page.tsx
import Image from 'next/image';

import { TopNoteCardList } from './_components/TopNoteCardList';
import { TopButton } from './_components/TopButton/TopButton';

export default async function Page() {
  return (
    <>
      <div className="bg-white drop-shadow-sm">
        <div className="min-h-[500px] max-w-[1024px] mx-auto flex justify-center gap-[48px]">
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-[8px]">あなたの切り口で記事をまとめよう</h1>
            <p className="text-slate-600 mb-[4px]">WiscroはURLをまとめたページを気軽に作れるアプリケーションです</p>
            <p className="text-slate-600 mb-[24px]">情報の整理や共有にお使いください</p>
            <TopButton />
          </div>
          <div className="flex flex-col justify-center">
            <Image src="/images/top.png" width={320} height={320} alt={'トップのイメージ'} />
          </div>
        </div>
      </div>
      <TopNoteCardList />
    </>
  );
}
