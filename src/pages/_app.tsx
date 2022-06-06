// import axios from 'axios';
import { AppProps } from 'next/app';
// import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
// import nProgress from 'nprogress';
import * as React from 'react';

import '@/styles/globals.css';

// import { getFromLocalStorage } from '@/lib/helper';

// import { blockDomainMeta } from '@/constants/env';

// Router.events.on('routeChangeStart', nProgress.start);
// Router.events.on('routeChangeError', nProgress.done);
// Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  // React.useEffect(() => {
  //   // Don't increment views if not on main domain
  //   if (window.location.host !== 'theodorusclarence.com' && blockDomainMeta) {
  //     if (getFromLocalStorage('incrementMetaFlag') !== 'false') {
  //       localStorage.setItem('incrementMetaFlag', 'false');
  //       // reload page to make changes
  //       window.location.reload();
  //     }
  //   }
  // }, []);

  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
