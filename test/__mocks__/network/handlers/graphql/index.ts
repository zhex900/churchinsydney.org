import { getEmailTemplateBySlug } from './getEmailTemplateBySlug';
import { getLinks } from './getLinks';
import { getOurBeliefs } from './getOurBeliefs';
import { getOurLives } from './getOurLives';
import { getPostBySlug } from './getPostBySlug';
import { getPosts } from './getPosts';
import { getPostsByTags } from './getPostsByTags';
import { getSettings } from './getSettings';
import { getTranslationsByNamespace } from './getTranslationsByNamespace';
import { login } from './login';

const handlers = [
  getPostsByTags,
  login,
  getEmailTemplateBySlug,
  getLinks,
  getPosts,
  getSettings,
  getOurBeliefs,
  getOurLives,
  getPostBySlug,
  getTranslationsByNamespace,
];

export default handlers;
