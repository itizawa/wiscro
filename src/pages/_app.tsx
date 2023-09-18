import { SWRConfig } from 'swr';
import Link from 'next/link';
import Head from 'next/head';

import '../styles/override-bootstrap.scss';
import { URLS } from '~/constants/urls';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any) {
  return (
    // TODO: display toaster
    <SWRConfig value={{ onError: () => void 0 }}>
      <Head>
        <title>Wiscro</title>
      </Head>
      <main className="bg-base min-vh-100">
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
        <div className="container">
          <Component {...pageProps} />
        </div>
      </main>
    </SWRConfig>
  );
}

export default MyApp;
