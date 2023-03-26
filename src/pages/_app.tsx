import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SWRConfig } from 'swr';
import { lightTheme, darkTheme } from '../styles';

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
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </SWRConfig>
  );
}

export default MyApp;
