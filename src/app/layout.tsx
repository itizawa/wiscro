import { Metadata } from 'next';
import { Providers } from './providers';
import '../styles/global.scss';
import { WiscroNavbar } from '~/components/layouts/WiscroNavbar';

export const metadata: Metadata = {
  title: 'Wiscro',
  description: 'WiscroはURLをまとめたページを気軽に作れるアプリケーションです。情報の整理や共有にお使いください。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="light min-h-[100vh] bg-slate-50">
      <body>
        <WiscroNavbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
