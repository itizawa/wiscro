import { Metadata } from 'next';
import { Providers } from './providers';
import '../styles/global.scss';
import { fetchMe } from './actions/userActions';
import { WiscroNavbar } from '~/components/layouts/WiscroNavbar';
import { WiscroFooter } from '~/components/layouts/WiscroFooter';

export const metadata: Metadata = {
  title: 'Wiscro',
  description: 'WiscroはURLをまとめたページを気軽に作れるアプリケーションです。情報の整理や共有にお使いください。',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = await fetchMe();

  return (
    <html lang="ja" className="light min-h-[100vh] bg-slate-50">
      <body className="min-h-[100vh] flex flex-col">
        <WiscroNavbar currentUser={currentUser} />
        <div className="flex-1">
          <Providers>{children}</Providers>
        </div>
        <WiscroFooter />
      </body>
    </html>
  );
}
