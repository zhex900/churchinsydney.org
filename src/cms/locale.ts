import { omit } from 'lodash';

export const parseTranslation = <T>(data: T) =>
  Object.values(data).map((item) => ({
    ...omit(item, ['translations']),
    ...item.translations[0],
  }));
