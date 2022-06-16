export async function fetchAPI(
  query: string,
  {
    variables,
    preview,
  }: {
    variables: unknown;
    preview: boolean;
  }
) {
  const url = process.env.NEXT_PUBLIC_WEBINY_API_URL;
  const res = await fetch(`${url}/${preview ? 'preview' : 'read'}/en` || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.WEBINY_API_SECRET}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}
