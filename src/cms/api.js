/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

const LIMIT = 100;
const api = axios.create();

axios.defaults.baseURL = process.env.CMS_API_ENDPOINT;

api.interceptors.request.use(
  async (config) => {
    const token = await auth();
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
    config.url = `${process.env.CMS_API_ENDPOINT}${config.url}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const auth = async () => {
  const {
    data: {
      data: { access_token },
    },
  } = await axios.post(`/auth/login`, {
    email: process.env.CMS_API_USERNAME,
    password: process.env.CMS_API_PASSWORD,
  });
  return access_token;
};

module.exports.getRedirect = async () => {
  const {
    data: { data: count },
  } = await api.get(`/items/redirect?aggregate[count]=*`);

  if (count > LIMIT) {
    throw new Error(
      `item [redirect] count (${count}) exceed (${LIMIT}), please remove some redirect.`
    );
  }
  const {
    data: { data: redirect },
  } = await api.get(`/items/redirect?limit=${LIMIT}`);
  return redirect;
};

module.exports.getPosts = async () => {
  const {
    data: { data: count },
  } = await api.get(
    `/items/posts?aggregate[count]=*&filter={ "status": { "_eq": "published" }}`
  );

  if (count > LIMIT) {
    throw new Error(
      `item [post] count (${count}) exceed (${LIMIT}), please disable some posts.`
    );
  }
  const {
    data: { data: posts },
  } = await api.get(
    `/items/posts?limit=${LIMIT}&filter={ "status": { "_eq": "published" }}`
  );
  return posts;
};
