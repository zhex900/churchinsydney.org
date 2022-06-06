// https://github.com/tvkhoa/react-tippy/issues/169
import {
  cloneElement,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { Tooltip, TooltipProps } from 'react-tippy';

interface TooltipWrappedProps extends PropsWithChildren<TooltipProps> {
  children?: ReactNode;
}

const BaseTooltip: FunctionComponent<TooltipWrappedProps> = (props) =>
  cloneElement(<Tooltip />, { ...props });

export default BaseTooltip;
