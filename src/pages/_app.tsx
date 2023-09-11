import type { AppProps } from 'next/app';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // TODO: display toaster
    <SWRConfig value={{ onError: () => void 0 }}>
      <NextThemesProvider defaultTheme="dark" attribute="class">
        <Component {...pageProps} />
      </NextThemesProvider>
    </SWRConfig>
  );
}

export default MyApp;
