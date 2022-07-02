import clsx from 'clsx';
import { TooltipProps } from 'flowbite-react';
import * as React from 'react';

import BaseTooltip from '@/components/tooltip/BaseTooltip';

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
  spanClassName,
  withUnderline = false,
  ...rest
}: TooltipTextProps) {
  if (!content) return <div>{children}</div>;
  return (
    <>
      <BaseTooltip content={<div>{content}</div>} {...rest}>
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
    </>
  );
}
