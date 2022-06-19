import { fetchAPI } from './webinyClient';

export async function getEmailTemplateBySlug(slug: string, toEmailKey: string) {
  const {
    getEmailTemplate: {
      data: { template },
    },
    getSetting: {
      data: { value: toEmail },
    },
  } = await fetchAPI(
    `
query($slug: String!, $toEmailKey: String!) {
  getEmailTemplate(where: { slug: $slug }) {
    data {
      template
    }
  }
  getSetting(where: {key: $toEmailKey}){
    data{
      value
    }
  }
}
  `,
    {
      preview: false,
      variables: { slug, toEmailKey },
    }
  );

  return { template, toEmail };
}
