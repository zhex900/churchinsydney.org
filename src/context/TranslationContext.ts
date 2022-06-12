import { createContext } from 'react';

import { Translations } from '@/types/types';

export const TranslationContext = createContext<Translations>({});
