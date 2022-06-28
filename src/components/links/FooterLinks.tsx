import { useContext, useEffect, useState } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

import { headerLinks } from '@/components/layout/Header';
import UnstyledLink from '@/components/links/UnstyledLink';
import Tooltip from '@/components/tooltip/Tooltip';

import { AppContext } from '@/context/AppContext';

export default function FooterLinks() {
  const { translations: t, links: footerLinks } = useContext(AppContext);
  const isMobile = useMediaQuery();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div />;

  let links = footerLinks;
  if (isMobile) {
    links = [
      ...headerLinks
        .filter(({ mobile }) => !mobile)
        .map(({ href }) => ({
          href,
          text: t[`common-${href.replace(/\//, '')}`],
          tooltip: null,
        })),
      ...(footerLinks || []),
    ];
  }
  return (
    <div
      className='flex flex-wrap justify-center gap-y-4 gap-x-8'
      aria-label='footer label'
    >
      {links?.map(({ href, text, tooltip }) => (
        <Tooltip
          interactive={false}
          key={href}
          content={tooltip}
          aria-label='tooltip'
        >
          <UnstyledLink
            className='animated-underline rounded-sm text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200'
            href={href}
            aria-label={text.toLowerCase()}
          >
            {text}
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}
