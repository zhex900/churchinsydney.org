import { Tooltip, TooltipProps } from 'flowbite-react';
import {
  cloneElement,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
} from 'react';

interface TooltipWrappedProps extends PropsWithChildren<TooltipProps> {
  children?: ReactNode;
}

const BaseTooltip: FunctionComponent<TooltipWrappedProps> = (props) =>
  cloneElement(<Tooltip arrow={false} style='auto' {...props} />);

export default BaseTooltip;
