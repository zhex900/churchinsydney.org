import { gql } from 'graphql-request';

import { request } from '@/lib/graphql';

import { Setting, Settings } from '@/types/types';

type GraphQLResponse = {
  settings: {
    [key: number]: Setting;
  };
};

export async function getSettings(): Promise<Settings> {
  const { settings } = (await request({
    document: gql`
      query GetSettings {
        settings {
          key
          value
        }
      }
    `,
  })) as GraphQLResponse;

  return Object.values(settings).reduce(
    (result, item) => ({
      ...result,
      [item.key]: item.value,
    }),
    {}
  );
}
