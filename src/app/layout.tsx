import { Metadata } from 'next';
import { Providers } from './providers';
import '../styles/global.scss';
import { WiscroNavbar } from '~/components/layouts/WiscroNavbar';

export const metadata: Metadata = {
  title: 'Wiscro',
  description: 'Wiscro is wisdom crowd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="light">
      <body>
        <WiscroNavbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
