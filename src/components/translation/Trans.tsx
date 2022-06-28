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
  const _text = text || '';
  /**
   * Memoize the transformation
   */
  const result = useMemo(() => {
    if (!components || components.length === 0) return _text;

    return formatElements(_text, components);
  }, [components, _text]) as unknown as JSX.Element;

  return result;
}
