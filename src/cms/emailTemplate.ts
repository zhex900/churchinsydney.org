import { gql } from 'graphql-request';

import { request } from '@/lib/graphql';

type GraphQLResponse = {
  email_templates: {
    0: {
      template: string;
    };
  };
  settings: {
    0: { toEmail: string };
  };
};

export async function getEmailTemplateBySlug(
  emailTemplateSlug: string,
  contactUstoEmailKey: string
) {
  const {
    email_templates: {
      0: { template },
    },
    settings: {
      0: { toEmail },
    },
  } = (await request({
    document: gql`
      query ($emailTemplateSlug: String!, $contactUstoEmailKey: String!) {
        email_templates(filter: { slug: { _eq: $emailTemplateSlug } }) {
          template
        }
        settings(filter: { key: { _eq: $contactUstoEmailKey } }) {
          toEmail: value
        }
      }
    `,
    variables: {
      emailTemplateSlug,
      contactUstoEmailKey,
    },
  })) as GraphQLResponse;

  return { template, toEmail };
}
