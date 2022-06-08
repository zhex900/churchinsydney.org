import countBy from 'lodash/countBy';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import toPairs from 'lodash/toPairs';

import { PostType } from '@/types/post';

export function sortDateFn<T extends PostType>(contentA: T, contentB: T) {
  return (
    new Date(contentB.lastUpdated ?? contentB.createdAt).valueOf() -
    new Date(contentA.lastUpdated ?? contentA.createdAt).valueOf()
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
