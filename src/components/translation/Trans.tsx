// https://github.com/vinissimus/next-translate/blob/master/src/Trans.tsx
import { ReactElement, useMemo } from 'react';

import formatElements from './formatElements';

export interface TranslationQuery {
  [name: string]: never;
}

export interface TransProps {
  text: string;
  components?: ReactElement[] | Record<string, ReactElement>;
}
/**
 * Translate transforming:
 * <0>This is an <1>example</1><0>
 * to -> <h1>This is an <b>example</b><h1>
 */
export default function Trans({ components, text }: TransProps): JSX.Element {
  /**
   * Memoize the transformation
   */
  const result = useMemo(() => {
    if (!components || components.length === 0) return text;

    return formatElements(text, components);
  }, [components, text]) as unknown as JSX.Element;

  return result;
}
