import { bundleMDX } from 'mdx-bundler';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { getPosts } from './graphcms';

export async function parseMDX(source: string) {
  //source: string, slug: string) {
  const { code } = await bundleMDX({
    source,
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['hash-anchor'],
            },
          },
        ],
      ];

      return options;
    },
  });
  return code;
}

export async function getRecommendations(currSlug: string) {
  const posts = await getPosts();

  const currentPost = posts.find(({ slug }) => slug === currSlug);

  // Remove posts, then randomize order
  const otherPosts = posts
    .filter(({ slug }) => slug !== currSlug)
    .sort(() => Math.random() - 0.5);

  // Find with similar tags
  const recommendations = otherPosts.filter(({ tags }) =>
    tags.some((t) => currentPost?.tags.join(',').includes(t))
  );

  // Populate with random recommendations if not enough
  const threeRecommendations =
    recommendations.length >= 3
      ? recommendations
      : [
          ...recommendations,
          ...otherPosts.filter(
            (p: { slug: string }) =>
              !recommendations.some((r: { slug: string }) => r.slug === p.slug)
          ),
        ];

  // Only return first three
  return threeRecommendations.slice(0, 3);
}
