import Head from 'next/head';
import { useRouter } from 'next/router';

import { data } from '@/../data';

const defaultMeta = {
  title: 'Church in Sydney',
  siteName: data.domain,
  description: 'Welcome 👋',
  url: `https://${data.domain}/`,
  image: `https://${data.domain}/favicon/apple-icon-180x180.png`,
  type: 'website',
  robots: 'follow, index',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
  isBlog?: boolean;
  banner?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />

      <meta name='theme-color' content='#ffffff' />
      <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
      <link rel='icon' href='/favicon/favicon.svg' type='image/svg+xml' />
      <link rel='mask-icon' href='/favicon/favicon.svg' color='#000000' />
      <link rel='apple-touch-icon' href='/favicon/apple-icon-180x180.png' />

      <link rel='manifest' href='/manifest.webmanifest' />
    </Head>
  );
}
