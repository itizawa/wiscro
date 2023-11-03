// app/page.tsx
import { Image } from '@nextui-org/image';
import { cookies } from 'next/headers';
import urlJoin from 'url-join';
import { TopNoteCardList } from './components/TopNoteCardList';
import { TopButton } from './components/TopButton/TopButton';

export default async function Page() {
  const cookieStore = cookies();
  const cookie = cookieStore
    .getAll()
    .map((v) => `${v.name}=${v.value}`)
    .join('; ');
  console.log(cookie, 14);

  const response = await fetch(urlJoin(process.env.NEXT_PUBLIC_SERVER_URL || '', '/api/me'), {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Credentials': 'true',
      cookie,
    },
    credentials: 'include',
    cache: 'no-store',
  }).catch((error) => {
    console.error(error);
    throw new Error(error);
  });
  const data = await response.json();
  console.log(data, 26);

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
      <TopNoteCardList />
    </>
  );
}
