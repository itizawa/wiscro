import { SWRConfig } from 'swr';
import Link from 'next/link';

import '../styles/override-bootstrap.scss';
import { URLS } from '~/constants/urls';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any) {
  return (
    // TODO: display toaster
    <SWRConfig value={{ onError: () => void 0 }}>
      <main className="bg-base">
        <nav className="navbar bg-white py-2">
          <div className="container d-flex space-between align-items-center justify-content-between">
            <Link className="navbar-brand text-decoration-none text-black" href={URLS.TOP}>
              Wiscro
            </Link>
            <Link href={URLS.QUESTION_NEW}>
              <button type="button" className="btn btn-md btn-primary text-white">
                作成
              </button>
            </Link>
          </div>
        </nav>
        <Component {...pageProps} />
      </main>
    </SWRConfig>
  );
}

export default MyApp;
