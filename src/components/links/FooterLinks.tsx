import { useContext, useEffect, useState } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

import { headerLinks } from '@/components/layout/Header';
import UnstyledLink from '@/components/links/UnstyledLink';
import Tooltip from '@/components/tooltip/Tooltip';

import { TranslationContext } from '@/context/TranslationContext';

export default function FooterLinks() {
  const t = useContext(TranslationContext);
  const isMobile = useMediaQuery();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div />;

  let links = footerLinks;
  if (isMobile) {
    links = headerLinks
      .filter(({ mobile }) => !mobile)
      .map(({ href }) => ({
        href,
        text: t[`common-${href.replace(/\//, '')}`].text,
        tooltip: '',
      }))
      .concat(footerLinks);
  }
  return (
    <div className='flex flex-wrap justify-center gap-y-4 gap-x-8'>
      {links.map(({ href, text, tooltip }) => (
        <Tooltip interactive={false} key={href} content={tooltip}>
          <UnstyledLink
            className='animated-underline rounded-sm text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200'
            href={href}
          >
            {text}
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

const footerLinks = [
  {
    href: 'https://streampublications.com.au/',
    text: 'Bookshop',
    tooltip: 'Purchase ministry books and HWMR',
  },
  {
    href: 'https://www.biblesforaustralia.org.au/',
    text: 'Bible for Austrlia',
    tooltip: '',
  },
  {
    href: 'https://www.ministrybooks.org/',
    text: 'Online ministry',
    tooltip: '',
  },
  {
    href: 'https://songbase.life/',
    text: 'Hymns and Songs',
    tooltip: '',
  },
];
