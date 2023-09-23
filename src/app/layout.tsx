import { Metadata } from 'next';
import { Providers } from './providers';
import '../styles/global.scss';

export const metadata: Metadata = {
  title: 'Wiscro',
  description: 'Wiscro is wisdom crowd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
