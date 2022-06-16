import { GRAPHQL_QUERY_LIMIT } from '@/constants';

import { localeField, transformLocaleFields } from './locale';
import { fetchAPI } from './webinyClient';

export async function getOurBeliefs(locale: string) {
  const {
    listOurBeliefs: { data },
  } = await fetchAPI(
    `
{
  listOurBeliefs(limit: ${GRAPHQL_QUERY_LIMIT}) {
    data {
      text {
        ${localeField(locale)}
      }
      ref {
        ${localeField(locale)}
      }
      isHeader
    }
  }
}
  `,
    {
      preview: false,
      variables: {},
    }
  );

  return data.map(transformLocaleFields(['text', 'ref']));
}
