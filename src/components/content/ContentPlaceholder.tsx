import React from 'react';

import Accent from '@/components/Accent';

import { AppContext } from '@/context/AppContext';

export default function ContentPlaceholder() {
  const { translations: t } = React.useContext(AppContext);
  return (
    <h2 className='mt-8 text-center sm:col-span-2 xl:col-span-3'>
      <Accent>{t['common-sorry-nothing-here']} :(</Accent>
    </h2>
  );
}
