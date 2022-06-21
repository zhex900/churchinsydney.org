import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

import UnstyledLink from '@/components/links/UnstyledLink';

import { AppContext } from '@/context/AppContext';

import LocaleButton from '../buttons/LocaleButton';
import ThemeButton from '../buttons/ThemeButton';
import Logo from '../images/Logo';
import PreviewTopBar from '../PreviewTopBar';

type HeaderProps = {
  large?: boolean;
};

export default function Header({ large = false }: HeaderProps) {
  const { translations: t } = useContext(AppContext);

  const router = useRouter();
  const arrOfRoute = router.route.split('/');
  const baseRoute = '/' + arrOfRoute[1];
  const [onTop, setOnTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.pageYOffset === 0);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isMobile = useMediaQuery();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div />;
  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-shadow',
        !onTop && 'shadow-sm'
      )}
    >
      <div className='bg-white transition-colors dark:bg-dark dark:text-white'>
        <PreviewTopBar />
        <nav
          className={clsx(
            'layout flex items-center justify-between py-4',
            large && 'lg:max-w-[68rem]'
          )}
        >
          <UnstyledLink href='/'>
            <Logo />
          </UnstyledLink>
          <ul className='flex items-center justify-between space-x-3 text-xs md:space-x-4 md:text-base'>
            {headerLinks.map(
              ({ href, mobile }) =>
                ((isMobile && mobile) || !isMobile) && (
                  <li key={href}>
                    <UnstyledLink
                      href={href}
                      className={clsx(
                        'rounded-sm py-2 transition-colors',
                        'font-medium text-black dark:text-white',
                        'group dark:hover:text-primary-300',
                        'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                      )}
                    >
                      <span
                        className={clsx(
                          'transition-colors',
                          'bg-primary-300/0 group-hover:text-primary-300 ',
                          href === baseRoute && 'text-primary-300'
                        )}
                      >
                        {t[`common-${href.replace(/\//, '')}`]}
                      </span>
                    </UnstyledLink>
                  </li>
                )
            )}
          </ul>
          <div className='flex justify-between space-x-3'>
            <ThemeButton />
            <LocaleButton />
          </div>
        </nav>
      </div>
    </header>
  );
}

export const headerLinks = [
  { href: '/our-belief', mobile: false },
  { href: '/our-life', mobile: false },
  { href: '/announcements', mobile: true },
  { href: '/events', mobile: true },
  { href: '/contact-us', mobile: false },
];
