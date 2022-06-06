import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Logo() {
  const { theme } = useTheme();
  const [logoClassName, setLogoClassName] = useState('');

  useEffect(() => {
    setLogoClassName(theme === 'dark' ? 'logo-dark' : '');
  }, [theme]);

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
