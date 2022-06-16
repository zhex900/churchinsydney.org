import { GRAPHQL_QUERY_LIMIT } from '@/constants';

import { fetchAPI } from './webinyClient';

export async function fetchTagIdsByName(tags: string[]) {
  const {
    listTags: { data },
  } = await fetchAPI(
    `
query($tags: [String!]!) {
	listTags(limit: ${GRAPHQL_QUERY_LIMIT}, where: { key_in: $tags } ){
		data {
			id
		}
	}
}
  `,
    {
      preview: false,
      variables: { tags },
    }
  );

  return data?.map(({ id }: { id: string }) => id);
}
