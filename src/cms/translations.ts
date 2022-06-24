import { gql } from 'graphql-request';

import { request } from '@/lib/graphql';

import { parseTranslation } from './locale';

import { Translations } from '@/types/types';

type GraphQLResponse = {
  translations: {
    0: {
      key: string;
      namespace: string;
      translations: {
        0: { text: string };
      };
    };
  };
};

export async function getTranslationsByNamespace(
  namespace: string[],
  locale: string
): Promise<Translations> {
  const { translations } = (await request({
    document: gql`
      query ($locale: String!, $namespace: [String!]!) {
        translations(filter: { namespace: { _in: $namespace } }) {
          key
          namespace
          translations(filter: { languages_code: { code: { _eq: $locale } } }) {
            text
          }
        }
      }
    `,
    variables: {
      locale,
      namespace,
    },
  })) as GraphQLResponse;

  return parseTranslation(translations).reduce(
    (result, item) => ({
      ...result,
      [`${item.namespace}-${item.key}`]: item.text,
    }),
    {}
  );
}
