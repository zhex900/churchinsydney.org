import { gql } from 'graphql-request';

import { request } from '@/lib/graphql';

import { parseTranslation } from './locale';

import { Link } from '@/types/types';

type GraphQLResponse = {
  links: [
    {
      href: string;
      translations: [{ text: string; tooltip: string | null }];
    }
  ];
};

export async function getLinks(locale: string): Promise<Link[]> {
  const { links } = (await request({
    document: gql`
      query GetLinks($locale: String!) {
        links {
          href
          translations(filter: { languages_code: { code: { _eq: $locale } } }) {
            text
            tooltip
          }
        }
      }
    `,
    variables: {
      locale,
    },
  })) as GraphQLResponse;

  return parseTranslation(links);
}
