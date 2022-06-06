import type { ReactPortal } from 'react';
import * as React from 'react';
import { TooltipProps } from 'react-tippy';

type ReactNode =
  | ReadonlyArray<ReactNode>
  | ReactPortal
  | boolean
  | null
  | undefined;

type WithChildren<T = { any: unknown }> = T & { children?: ReactNode };

export class TooltipType extends React.Component<WithChildren<TooltipProps>> {}
