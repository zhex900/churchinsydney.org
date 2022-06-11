import { format, getDate, isSameMonth, isSameYear } from 'date-fns';

import { DATE_FORMAT } from '@/constants';

import { EvenDate } from '@/types/types';

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
