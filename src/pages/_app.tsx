import { Flowbite } from 'flowbite-react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { CookiesProvider } from 'react-cookie';
import { ErrorBoundary } from 'react-error-boundary';

import '@/styles/globals.css';
import '@/styles/richText.css';

import { theme } from '@/styles/theme';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
        <CookiesProvider>
          <Flowbite theme={theme}>
            <Component {...pageProps} />
          </Flowbite>
        </CookiesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
