import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <script
            src='https://cdn.onesignal.com/sdks/OneSignalSDK.js'
            async
          ></script>
          {/* <script src='/flowbite.js' async></script> */}

          <link
            rel='apple-touch-icon'
            href='/favicon/apple-icon-180x180.png'
          ></link>
          <meta name='theme-color' content='#fff' />
          <link
            rel='preload'
            href='/fonts/inter-var-latin.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          {/* <script
            async
            defer
            data-website-id='a422e5d6-8fc9-4bea-ac25-1effc08a67f0'
            src='https://umami.thcl.dev/umami.js'
            data-domains='churchinsydne.org'
          /> */}
        </Head>
        <body className='bg-white transition-colors dark:bg-dark dark:text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
