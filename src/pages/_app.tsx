import { SWRConfig } from 'swr';
import Head from 'next/head';
import '../styles/global.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AppBar, Box, Button, Toolbar } from '@mui/material';
import Link from 'next/link';
import { URLS } from '~/constants/urls';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any) {
  return (
    // TODO: display toaster
    <SWRConfig value={{ onError: () => void 0 }}>
      <Head>
        <title>Wiscro</title>
      </Head>
      <Box sx={{ minHeight: '100vh' }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Link className="navbar-brand text-decoration-none text-black" href={URLS.TOP}>
                Wiscro
              </Link>
              <Link href={URLS.QUESTION_NEW}>
                <Button type="button" className="btn btn-md btn-primary text-white">
                  作成
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </Box>
    </SWRConfig>
  );
}

export default MyApp;
