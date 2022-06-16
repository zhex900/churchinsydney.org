import { getPosts } from '@/cms';

export default async function getRecommendations(
  currSlug: string,
  locale: string
) {
  const posts = await getPosts(locale);

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
