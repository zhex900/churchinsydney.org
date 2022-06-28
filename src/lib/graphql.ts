import { gql, request as baseRequest, RequestOptions } from 'graphql-request';
import { GraphQLResponse } from 'graphql-request/dist/types';

const BASE_URL = process.env.CMS_API_ENDPOINT;

const auth = async (
  email = process.env.CMS_API_USERNAME,
  password = process.env.CMS_API_PASSWORD
) => {
  const query = gql`
    mutation Login($email: String!, $password: String!) {
      auth_login(email: $email, password: $password) {
        access_token
        refresh_token
      }
    }
  `;

  const { auth_login } = await baseRequest({
    url: `${BASE_URL}/graphql/system`,
    document: query,
    variables: {
      email,
      password,
    },
  });

  if (auth_login) {
    process.env.ACCESS_TOKEN = auth_login.access_token;
    process.env.REFRESH_TOKEN = auth_login.refresh_token;
  }
};

const refreshToken = async () => {
  const query = gql`
    mutation RefreshToken($refreshToken: String!) {
      auth_refresh(refresh_token: $refreshToken, mode: json) {
        access_token
        refresh_token
      }
    }
  `;

  const { auth_refresh } = await baseRequest({
    url: `${BASE_URL}/graphql/system`,
    document: query,
    variables: {
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });
  if (auth_refresh) {
    process.env.ACCESS_TOKEN = auth_refresh.access_token;
    process.env.REFRESH_TOKEN = auth_refresh.refresh_token;
  }
};

export const request = async <T>(
  options: RequestOptions,
  retryCount = 1
): Promise<T | undefined> => {
  // first authentication
  if (!process.env.ACCESS_TOKEN) {
    await auth();
  }

  const token = process.env.ACCESS_TOKEN;
  try {
    const result = await baseRequest({
      url: `${BASE_URL}/graphql`,
      ...options,
      requestHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (e: unknown) {
    const error = e as GraphQLResponse;

    if ([401, 403].includes(error.response.status)) {
      if (retryCount > 3) {
        throw new Error('Too many retries');
      }
      if (retryCount > 0) {
        await auth();
        return request(options, retryCount++);
      }
      await refreshToken();
      return request(options, retryCount++);
    }

    // eslint-disable-next-line no-console
    console.log(e);
  }
};
