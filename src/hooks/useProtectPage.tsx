import { intersection } from 'lodash';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { COOKIES } from '@/constants';

import { Settings } from '@/types/types';

export default function useProtectPage(tags: string[], settings: Settings) {
  const [haveAccess, setHaveAccess] = useState(false);
  const [cookies] = useCookies([COOKIES.MEMBERS_PASSWORD]);

  const memberPassword = settings[COOKIES.MEMBERS_PASSWORD];
  const protectedTags = settings.protectedTags?.split(',');
  const isProtected = !!intersection(tags, protectedTags).length;
  useEffect(() => {
    setHaveAccess(cookies?.MEMBERS_PASSWORD === memberPassword || !isProtected);
  }, [
    cookies?.MEMBERS_PASSWORD,
    isProtected,
    tags,
    protectedTags,
    memberPassword,
  ]);

  return { haveAccess, isProtected, memberPassword };
}
