import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { CookiesProvider } from 'react-cookie';

import '@/styles/globals.css';
import 'react-tippy/dist/tippy.css';
import '@/styles/globals.css';
import '@/styles/mdx.css';
import '@/styles/dracula.css';

import useOneSignal from '@/lib/useOneSignal';

function MyApp({ Component, pageProps }: AppProps) {
  useOneSignal();
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
