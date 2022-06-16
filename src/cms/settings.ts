import { Settings } from 'http2';

import { GRAPHQL_QUERY_LIMIT } from '@/constants';

import { fetchAPI } from './webinyClient';

import { Setting } from '@/types/types';

export async function getSettings() {
  const {
    listSettings: { data },
  } = await fetchAPI(
    `
{
  listSettings(limit: ${GRAPHQL_QUERY_LIMIT}) {
    data {
      key
      value
    }
  }
}
`,
    {
      preview: false,
      variables: {},
    }
  );

  return data?.reduce(
    (result: Settings, item: Setting) => ({
      ...result,
      [item.key]: item.value,
    }),
    {}
  );
}
