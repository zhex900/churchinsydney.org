import { gql } from 'graphql-request';

import { request } from '@/lib/graphql';

import { parseTranslation } from './locale';

import { OurBelief } from '@/types/types';

type GraphQLResponse = {
  our_beliefs: [
    {
      header: boolean;
      translations: [{ text: string; ref: string }];
    }
  ];
};

export async function getOurBeliefs(locale: string): Promise<OurBelief[]> {
  const { our_beliefs } = (await request({
    document: gql`
      query GetOurBeliefs($locale: String!) {
        our_beliefs {
          header
          translations(filter: { languages_code: { code: { _eq: $locale } } }) {
            text
            ref
          }
        }
      }
    `,
    variables: {
      locale,
    },
  })) as GraphQLResponse;

  return parseTranslation(our_beliefs);
}
