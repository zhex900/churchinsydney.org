import { localeField, transformLocaleFields } from './locale';
import { fetchAPI } from './webinyClient';

export async function getLinks(locale: string) {
  const {
    listLinks: { data },
  } = await fetchAPI(
    `
{
  listLinks(limit: 1000) {
    data {
      href
      text {
        ${localeField(locale)}
      }
      tooltip {
        ${localeField(locale)}
      }
    }
  }
}
  `,
    {
      preview: false,
      variables: {},
    }
  );
  return data.map(transformLocaleFields(['text', 'tooltip']));
}
