import { SWRConfig } from 'swr';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // TODO: display toaster
    <SWRConfig value={{ onError: () => void 0 }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
