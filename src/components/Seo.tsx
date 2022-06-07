import Head from 'next/head';
import { useRouter } from 'next/router';

// import { openGraph } from '@/lib/helper';

const defaultMeta = {
  title: 'Church in Sydney | Welcome 👋',
  siteName: 'https://churchinsydney.org/',
  description:
    'An online portfolio and blog by Theodorus Clarence. Showcase of my projects, and some of my thoughts about website development.',
  url: 'https://churchinsydney.org/',
  image: '',
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

  // Use siteName if there is templateTitle
  // but show full title if there is none
  // meta.image = openGraph({
  //   description: meta.description,
  //   siteName: props.templateTitle ? meta.siteName : meta.title,
  //   templateTitle: props.templateTitle,
  //   banner: props.banner,
  //   isBlog: props.isBlog,
  // });

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
      <link rel='apple-touch-icon' href='apple-icon-180x180.png' />

      <link rel='manifest' href='/manifest.webmanifest' />
    </Head>
  );
}
