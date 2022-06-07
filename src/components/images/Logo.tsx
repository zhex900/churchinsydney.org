import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

export default function Logo() {
  const { theme } = useTheme();
  const [logoClassName, setLogoClassName] = useState('');
  const isMobile = useMediaQuery();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLogoClassName(theme === 'dark' ? 'logo-dark' : '');
  }, [theme]);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (isMobile) {
    return (
      <Image
        className={logoClassName}
        alt='logo'
        src='/favicon/favicon.svg'
        width={42}
        height={42}
      />
    );
  }
  return (
    <Image
      className={logoClassName}
      alt='logo'
      src='/images/logo.svg'
      width={240}
      height={80}
    />
  );
}
