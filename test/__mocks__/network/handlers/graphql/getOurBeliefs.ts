import { graphql } from 'msw';

export const getOurBeliefs = graphql.query('GetOurBeliefs', (req, res, ctx) => {
  return res(
    ctx.data({
      our_beliefs: [
        {
          header: null,
          translations: [
            {
              text: 'God is uniquely one, yet Triune — the Father, the Son, and the Spirit.',
              ref: '(1 Tim. 2:5a, Matt. 28:19)',
            },
          ],
        },
        {
          header: true,
          translations: [
            {
              text: 'Christ resurrected from among the dead on the third day.',
              ref: '(1 Cor. 15:4)',
            },
          ],
        },
      ],
    })
  );
});
