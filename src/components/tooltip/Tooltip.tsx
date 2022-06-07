import clsx from 'clsx';
import * as React from 'react';
import { TooltipProps } from 'react-tippy';

import BaseTooltip from './BaseTooltip';

type TooltipTextProps = {
  content?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  spanClassName?: string;
  withUnderline?: boolean;
} & TooltipProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'className'>;

export default function Tooltip({
  content,
  children,
  className,
  spanClassName,
  withUnderline = false,
  ...rest
}: TooltipTextProps) {
  if (!content) return <div>{children}</div>;
  return (
    <BaseTooltip
      trigger='mouseenter'
      interactive
      html={
        <div
          className={clsx(
            className,
            'inline-block rounded-md bg-white p-2 text-gray-600 shadow-md dark:bg-dark dark:text-gray-200',
            'border dark:border-gray-600 '
          )}
        >
          {content}
        </div>
      }
      {...rest}
    >
      {withUnderline ? (
        <span
          className={clsx(spanClassName, 'underline')}
          style={{ textDecorationStyle: 'dotted' }}
        >
          {children}
        </span>
      ) : (
        <>{children}</>
      )}
    </BaseTooltip>
  );
}
