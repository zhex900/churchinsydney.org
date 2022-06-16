export function getLocaleValue<T>(field: T) {
  return Object.values(field)[0];
}

export type GraphQlLocalFieldType = { en: string; zh: string };

export function isEnglish(locale: string) {
  return locale === 'en';
}
export const localeField = (locale: string) => `
    en @include(if: ${isEnglish(locale)})
    zh @skip(if: ${isEnglish(locale)})
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
