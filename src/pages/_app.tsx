import { Flowbite } from 'flowbite-react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { CookiesProvider } from 'react-cookie';

import '@/styles/globals.css';
import '@/styles/richText.css';

import { theme } from '@/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <CookiesProvider>
        <Flowbite theme={theme}>
          <Component {...pageProps} />
        </Flowbite>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
