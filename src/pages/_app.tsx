import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SWRConfig } from 'swr';
import { lightTheme, darkTheme } from '../styles';
import { LiffProvider } from '~/components/providers/LiffProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // TODO: display toaster
    <SWRConfig value={{ onError: () => void 0 }}>
      <NextThemesProvider
        defaultTheme="dark"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <LiffProvider>
            <Component {...pageProps} />
          </LiffProvider>
        </NextUIProvider>
      </NextThemesProvider>
    </SWRConfig>
  );
}

export default MyApp;
