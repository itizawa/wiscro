import { SWRConfig } from 'swr';

import '../styles/override-bootstrap.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any) {
  return (
    // TODO: display toaster
    <SWRConfig value={{ onError: () => void 0 }}>
      <main className="bg-base">
        <Component {...pageProps} />
      </main>
    </SWRConfig>
  );
}

export default MyApp;
