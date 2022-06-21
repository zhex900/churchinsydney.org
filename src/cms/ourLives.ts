import { GRAPHQL_QUERY_LIMIT } from '@/constants';

import { localeField, transformLocaleFields } from './locale';
import { fetchAPI } from './webinyClient';

export async function getOurLives(locale: string) {
  const {
    listOurLives: { data },
  } = await fetchAPI(
    `
{
  listOurLives(limit: ${GRAPHQL_QUERY_LIMIT}) {
    data {
      title {
        ${localeField(locale)}
      }
      description {
        ${localeField(locale)}
      }
      isHeader
      icon
    }
  }
}
  `,
    {
      preview: false,
      variables: {},
    }
  );

  return data.map(transformLocaleFields(['title', 'description']));
}
