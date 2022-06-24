import { gql } from 'graphql-request';
import { Settings } from 'http2';

import { request } from '@/lib/graphql';

import { Setting } from '@/types/types';

type GraphQLResponse = {
  settings: {
    [key: number]: Setting;
  };
};

export async function getSettings(): Promise<Settings> {
  const { settings } = (await request({
    document: gql`
      {
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
