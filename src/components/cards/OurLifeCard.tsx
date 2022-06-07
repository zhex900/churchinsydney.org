import clsx from 'clsx';
import * as React from 'react';
import { IconType } from 'react-icons/lib';

type OurLifeCardProps = {
  snippet: {
    icon: IconType;
    title: string;
    description: string;
  };
  index: number;
} & React.ComponentPropsWithoutRef<'li'>;

export default function OurLifeCard({
  className,
  snippet,
  index,
}: OurLifeCardProps) {
  return (
    <li
      className={clsx(
        'ring-vis-0 h-full rounded-md border bg-white dark:border-gray-600 dark:bg-dark',
        'scale-100 hover:scale-[1.04] active:scale-[0.97] motion-safe:transform-gpu',
        'transition duration-100',
        'motion-reduce:hover:scale-100',
        'animate-shadow',
        className
      )}
      data-fade={index + 2}
    >
      <div className='block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300'>
        <div className='p-4'>
          <div className='mt-1 flex items-center justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-300'>
            <div className='flex items-center gap-1'>
              <snippet.icon className='h-7 w-7 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
            </div>
            <h4 className='text-gray-800 dark:text-gray-100'>
              {snippet.title}
            </h4>
          </div>

          <p className='mt-4 text-justify text-sm text-gray-600 dark:text-gray-300'>
            {snippet.description}
          </p>
        </div>
      </div>
    </li>
  );
}
