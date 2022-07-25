import { graphql } from 'msw';

import translations from './fixtures/translations.json';

export const getTranslationsByNamespace = graphql.query(
  'GetTranslationsByNamespace',
  (request, res, ctx) => {
    const locale = request.variables.locale as 'en' | 'zh-CN';
    return res(ctx.data(translations[locale]));
  }
);
