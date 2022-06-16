import { format, getDate, isSameMonth, isSameYear } from 'date-fns';
import { countBy, map, sortBy, toPairs } from 'lodash';

import { DATE_FORMAT } from '@/constants';

import { EvenDate } from '@/types/types';
import { PostType } from '@/types/types';

export function sortDateFn<T extends PostType>(contentA: T, contentB: T) {
  return (
    new Date(contentB.savedOn ?? contentB.createdOn).valueOf() -
    new Date(contentA.savedOn ?? contentA.createdOn).valueOf()
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

export function formatEventDate(eventDate: EvenDate) {
  const startDate = new Date(eventDate.startDate);
  const endDate = new Date(eventDate.endDate);

  if (isSameMonth(startDate, endDate) && isSameYear(startDate, endDate)) {
    return `${getDate(startDate)}-${getDate(endDate)}, ${format(
      startDate,
      'MMMM yyyy'
    )}`;
  } else if (isSameYear(startDate, endDate)) {
    return `${format(startDate, 'dd MMMM')} - ${format(endDate, DATE_FORMAT)}`;
  }

  return `${format(startDate, DATE_FORMAT)} - ${format(endDate, DATE_FORMAT)}`;
}
