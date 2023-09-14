import { SWRConfig } from 'swr';

import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any) {
  return (
    // TODO: display toaster
    <SWRConfig value={{ onError: () => void 0 }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
