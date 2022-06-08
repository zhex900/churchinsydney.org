/* eslint-disable @typescript-eslint/no-explicit-any */
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { intersection } from 'lodash';
import { bundleMDX } from 'mdx-bundler';
import { join } from 'path';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { getPosts } from './graphcms';

import {
  ContentType,
  Frontmatter,
  FrontmatterWithTags,
  PickFrontmatter,
  PostType,
} from '@/types/frontmatters';

export async function getFiles(type: ContentType) {
  return readdirSync(join(process.cwd(), 'src', 'contents', type));
}

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
export async function getFileBySlug(type: ContentType, slug: string) {
  const source = slug
    ? readFileSync(
        join(process.cwd(), 'src', 'contents', type, `${slug}.mdx`),
        'utf8'
      )
    : readFileSync(
        join(process.cwd(), 'src', 'contents', `${type}.mdx`),
        'utf8'
      );
  const { code, frontmatter } = await bundleMDX({
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
  return {
    code,
    frontmatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      ...frontmatter,
    },
  };
}

export async function getAllFilesFrontmatter<T extends ContentType>(type: T) {
  const files = readdirSync(join(process.cwd(), 'src', 'contents', type));

  return files.reduce(
    (allPosts: Array<PickFrontmatter<T>>, postSlug: string) => {
      const source = readFileSync(
        join(process.cwd(), 'src', 'contents', type, postSlug),
        'utf8'
      );
      const { data } = matter(source);

      const res = [
        {
          ...(data as PickFrontmatter<T>),
          slug: postSlug.replace('.mdx', ''),
          readingTime: readingTime(source),
        },
        ...allPosts,
      ];
      return res;
    },
    []
  );
}

export async function getRecommendations(currSlug: string) {
  // const frontmatters = await getAllFilesFrontmatter('blog');
  const posts = await getPosts();
  // Get current frontmatter
  const currentFm = posts.find(({ slug }) => slug === currSlug);

  // Remove currentFm and Bahasa Posts, then randomize order
  const otherFms = posts
    .filter(({ slug }) => slug !== currSlug)
    .sort(() => Math.random() - 0.5);

  // Find with similar tags
  const recommendations = otherFms.filter(({ tags }) =>
    tags.some((t: any) => currentFm?.tags.join(',').includes(t))
  );

  // Populate with random recommendations if not enough
  const threeRecommendations =
    recommendations.length >= 3
      ? recommendations
      : [
          ...recommendations,
          ...otherFms.filter(
            (fm: { slug: any }) =>
              !recommendations.some((r: { slug: any }) => r.slug === fm.slug)
          ),
        ];

  // Only return first three
  return threeRecommendations.slice(0, 3);
}

/**
 * Get and order frontmatters by specified array
 */
export function getFeatured<T extends Frontmatter>(
  contents: Array<T>,
  features: string[]
) {
  // override as T because there is no typechecking on the features array
  return features.map(
    (feat) => contents.find((content) => content.slug === feat) as T
  );
}

/**
 * Get and order frontmatters by tags
 */
export function getByTags<T extends FrontmatterWithTags>(
  contents: Array<T>,
  fitlerTags: string[]
) {
  return contents.filter(
    ({ tags }) =>
      intersection(
        tags.split(',').map((t) => t.trim()),
        fitlerTags
      ).length
  );
}
