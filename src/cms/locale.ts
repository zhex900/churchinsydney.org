import { isEmpty } from 'lodash';

export function getLocaleValue<T>(field: T) {
  if (Object.keys(field).length > 1) {
    return isEmpty(Object.values(field)[0])
      ? Object.values(field)[1]
      : Object.values(field)[0];
  }
  return Object.values(field)[0];
}

export type GraphQlLocalFieldType = { en: string; zh: string };

export const LOCALE_KEYS = {
  EN: 'en',
  ZH: 'zh',
};

export function isEnglish(locale: string) {
  return locale === 'en';
}
export const localeField = (locale: string, defaultToEnglish = false) =>
  defaultToEnglish
    ? `
    ${!isEnglish(locale) ? LOCALE_KEYS.ZH : ''}
    ${LOCALE_KEYS.EN}
    `
    : `
    ${LOCALE_KEYS.EN} @include(if: ${isEnglish(locale)})
    ${LOCALE_KEYS.ZH} @skip(if: ${isEnglish(locale)})
  `;

export const transformLocaleFields =
  <T>(localeFields: (keyof T)[]) =>
  (model: T) => {
    return {
      ...model,
      ...localeFields.reduce(
        (result, field) => ({
          ...result,
          [field]: model[field] ? getLocaleValue(model[field]) : null,
        }),
        {}
      ),
    };
  };
