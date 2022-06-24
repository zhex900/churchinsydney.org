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
        'ring-vis-0 h-full rounded-md',
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
          <div>
            <snippet.icon size={'50px'} className='icon align-middle' />
          </div>
          <h3 className='mt-5 text-gray-800 dark:text-gray-100'>
            {snippet.title}
          </h3>

          <p className='mt-4 text-justify text-base text-gray-600 dark:text-gray-300'>
            {snippet.description}
          </p>
        </div>
      </div>
    </li>
  );
}
