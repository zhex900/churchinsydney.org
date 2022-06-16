import { GRAPHQL_QUERY_LIMIT } from '@/constants';

import { localeField } from './locale';
import { fetchAPI } from './webinyClient';

import { Translations } from '@/types/types';

export async function getTranslationsByNamespace(
  namespace: string[],
  locale: string
): Promise<Translations> {
  const {
    listTranslations: { data },
  } = await fetchAPI(
    `
query($namespace: [String!]!) {
	listTranslations(limit: ${GRAPHQL_QUERY_LIMIT}, where: { namespace_in: $namespace }) {
		data {
			key
			namespace
      text {
        ${localeField(locale)}
      }
		}
	}
}
`,
    {
      preview: false,
      variables: {
        namespace,
      },
    }
  );

  return data.reduce(
    (
      result: Translations,
      item: {
        key: string;
        namespace: string;
        text: {
          [key: string]: string;
        };
      }
    ) => ({
      ...result,
      [`${item.namespace}-${item.key}`]: Object.values(item.text)[0],
    }),
    {}
  );
}
