import { gql } from 'graphql-request';

import { request } from '@/lib/graphql';

import { parseTranslation } from './locale';

import { OurLife } from '@/types/types';

type GraphQLResponse = {
  our_lives: [
    {
      icon: string;
      header: boolean;
      translations: [{ description: string; title: string }];
    }
  ];
};

export async function getOurLives(locale: string): Promise<OurLife[]> {
  const { our_lives } = (await request({
    document: gql`
      query GetOurLives($locale: String!) {
        our_lives {
          icon
          header
          translations(filter: { languages_code: { code: { _eq: $locale } } }) {
            description
            title
          }
        }
      }
    `,
    variables: {
      locale,
    },
  })) as GraphQLResponse;

  return parseTranslation(our_lives);
}
