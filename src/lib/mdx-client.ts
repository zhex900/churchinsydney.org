import { countBy, map, sortBy, toPairs } from 'lodash';

import { PostType } from '@/types/types';

export function sortDateFn<T extends PostType>(contentA: T, contentB: T) {
  return (
    new Date(contentB.updatedAt ?? contentB.createdAt).valueOf() -
    new Date(contentA.updatedAt ?? contentA.createdAt).valueOf()
  );
}

export function sortByDate<T extends PostType>(contents: Array<T>) {
  return contents.sort(sortDateFn);
}

export function sortTitleFn<T extends PostType>(contentA: T, contentB: T) {
  return contentA.title.localeCompare(contentB.title);
}

export function sortByTitle<T extends Array<PostType>>(contents: T): T {
  return contents.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );
}

/**
 * Get tags of each post and remove duplicates
 */
export function getTags<T extends Array<PostType>>(contents: T) {
  const tags = contents.reduce(
    (accTags: string[], content) => [...accTags, ...content.tags],
    []
  );

  return map(sortBy(toPairs(countBy(tags)), 1), 0).reverse();
}
