import { graphql } from 'msw';

export const getSettings = graphql.query('GetSettings', (req, res, ctx) => {
  return res(
    ctx.data({
      settings: [
        {
          key: 'contact-us-to-email',
          value: 'itsupport@churchinsydney.org',
        },
        {
          key: 'show-hero-image',
          value: 'false',
        },
        {
          key: 'protected-tags',
          value: 'members,会员',
        },
        {
          key: 'domain',
          value: 'churchinsydney.org',
        },
        {
          key: 'email',
          value: 'office@churchinsydney.org',
        },
        {
          key: 'phone',
          value: '+61 02 9341 2426',
        },
        {
          key: 'address',
          value: '169 Foxall Road North Kellyville NSW 2155',
        },
        {
          key: 'members-password',
          value: 'Amen',
        },
        {
          key: 'netlify-site-name',
          value: 'churchinsydney',
        },
      ],
    })
  );
});
