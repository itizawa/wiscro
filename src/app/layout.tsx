import { Metadata } from 'next';
import { Providers } from './providers';
import '../styles/global.scss';
import { WiscroNavbar } from '~/components/layouts/WiscroNavbar';
import { WiscroFooter } from '~/components/layouts/WiscroFooter';

const title = 'Wiscro';
const description = 'WiscroはURLをまとめたページを気軽に作れるアプリケーションです。情報の整理や共有にお使いください。';
const url = 'https://www.wiscro.app/';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
    site: '@same_gum',
    creator: '@same_gum',
  },
  metadataBase: new URL(process.env.URL ?? 'http://localhost:3000'),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="light min-h-[100vh] bg-slate-50">
      <body className="min-h-[100vh] flex flex-col">
        <WiscroNavbar />
        <div className="flex-1">
          <Providers>{children}</Providers>
        </div>
        <WiscroFooter />
      </body>
    </html>
  );
}
