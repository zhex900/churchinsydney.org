import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import UnstyledLink from '@/components/links/UnstyledLink';

import LocaleButton from '../buttons/LocaleButton';
import Logo from '../images/Logo';

type HeaderProps = {
  large?: boolean;
};

export default function Header({ large = false }: HeaderProps) {
  const { t } = useTranslation('common');
  const { theme, setTheme } = useTheme();
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
            {links.map(({ href }) => (
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
            ))}
          </ul>
          <div className='flex justify-between space-x-3'>
            <button
              className={clsx(
                'rounded-md p-2.5 focus:outline-none',
                'border dark:border-gray-600',
                'hover:border-primary-300 hover:text-primary-300 dark:hover:border-primary-300 dark:hover:text-primary-300',
                'focus-visible:border-primary-300 focus-visible:text-primary-300 dark:focus-visible:border-primary-300 dark:focus-visible:text-primary-300'
              )}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            <LocaleButton />
          </div>
        </nav>
      </div>
    </header>
  );
}

const links = [
  { href: '/our-beliefs' },
  { href: '/our-life' },
  { href: '/announcements' },
  { href: '/contact-us' },
];
