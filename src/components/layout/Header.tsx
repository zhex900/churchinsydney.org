import clsx from 'clsx';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

import UnstyledLink from '@/components/links/UnstyledLink';

import LocaleButton from '../buttons/LocaleButton';
import ThemeButton from '../buttons/ThemeButton';
import Logo from '../images/Logo';

type HeaderProps = {
  large?: boolean;
};

export default function Header({ large = false }: HeaderProps) {
  const { t } = useTranslation('common');

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
  if (!mounted) return;
  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-shadow',
        !onTop && 'shadow-sm'
      )}
    >
      <div className='bg-white transition-colors dark:bg-dark dark:text-white'>
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
                          'bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0',
                          href === baseRoute &&
                            '!bg-primary-300/50 dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent'
                        )}
                      >
                        {t(href.replace(/\//, ''))}
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
  { href: '/our-beliefs', mobile: false, text: 'beliefs', tooltip: '' },
  { href: '/our-life', mobile: true, text: 'life', tooltip: '' },
  { href: '/announcements', mobile: true, text: 'announcements', tooltip: '' },
  { href: '/contact-us', mobile: false, text: 'contact', tooltip: '' },
];
