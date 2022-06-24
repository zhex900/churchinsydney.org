import { intersection } from 'lodash';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { COOKIES } from '@/constants';

import { Settings } from '@/types/types';

export default function useProtectPage(tags: string[], settings: Settings) {
  const [haveAccess, setHaveAccess] = useState(false);
  const [cookies] = useCookies([COOKIES.MEMBERS_PASSWORD]);

  const memberPassword = settings[COOKIES.MEMBERS_PASSWORD];
  const protectedTags = settings['protected-tags']?.split(',');

  const isProtected = !!intersection(
    tags.map((tag) => tag.toLocaleLowerCase()),
    protectedTags
  ).length;
  useEffect(() => {
    setHaveAccess(
      cookies[COOKIES.MEMBERS_PASSWORD] === memberPassword || !isProtected
    );
  }, [cookies, isProtected, tags, protectedTags, memberPassword]);

  return { haveAccess, isProtected, memberPassword };
}
