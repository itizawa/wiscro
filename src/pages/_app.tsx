import { SWRConfig } from 'swr';
import Head from 'next/head';
import '../styles/global.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider } from '@mui/material';
import { theme } from '~/components/layouts/theme';
import { DefaultLayout } from '~/components/layouts/DefaultLayout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any) {
  return (
    // TODO: display toaster
    <SWRConfig value={{ onError: () => void 0 }}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Wiscro</title>
        </Head>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
