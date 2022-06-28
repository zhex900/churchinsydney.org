import { graphql } from 'msw';

export const links = [
  {
    href: 'https://songbase.life/',
    translations: [
      {
        text: 'Hymns and Songs',
        tooltip: null,
      },
    ],
  },
  {
    href: 'https://www.ministrybooks.org/',
    translations: [
      {
        text: 'Online ministry',
        tooltip: null,
      },
    ],
  },
];

export const getLinks = graphql.query('GetLinks', (req, res, ctx) => {
  return res(
    ctx.data({
      links,
    })
  );
});
