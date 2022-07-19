import { getDate, isSameMonth, isSameYear } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { countBy, map, sortBy, toPairs } from 'lodash';

import { DATE_FORMAT, TIME_ZONE } from '@/constants';

import { PostType } from '@/types/types';

export function sortDateFn<T extends PostType>(contentA: T, contentB: T) {
  return (
    new Date(contentB.dateUpdated ?? contentB.dateCreated).valueOf() -
    new Date(contentA.dateUpdated ?? contentA.dateCreated).valueOf()
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

export function formatEventDate(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isSameMonth(start, end) && isSameYear(start, end)) {
    return `${getDate(start)}-${getDate(end)}, ${formatInTimeZone(
      start,
      TIME_ZONE,
      'MMMM yyyy'
    )}`;
  } else if (isSameYear(start, end)) {
    return `${formatInTimeZone(
      start,
      TIME_ZONE,
      'dd MMMM'
    )} - ${formatInTimeZone(end, TIME_ZONE, DATE_FORMAT)}`;
  }

  return `${formatInTimeZone(
    start,
    TIME_ZONE,
    DATE_FORMAT
  )} - ${formatInTimeZone(end, TIME_ZONE, DATE_FORMAT)}`;
}
