import clsx from 'clsx';
import NextImage from 'next/image';
import * as React from 'react';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

type ImageType = {
  url: string;
  height: string | number;
  width: string | number;
  alt: string;
  title?: string;
  className?: string;
  preview?: boolean;
  noStyle?: boolean;
  aspect?: {
    width: number;
    height: number;
  };
} & React.ComponentPropsWithoutRef<'figure'>;

export default function Image({
  url,
  height,
  width,
  alt,
  title,
  className,
  preview = true,
  noStyle = false,
  style,
  aspect,
  ...rest
}: ImageType) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const aspectRatio = aspect ? aspect.height / aspect.width : undefined;

  return (
    <figure
      className={clsx(className, {
        'overflow-hidden rounded shadow-sm dark:shadow-none': !noStyle,
        // 'mx-auto w-full': mdx && width <= 800,
      })}
      style={{
        // ...(mdx && width <= 800 ? { maxWidth: width } : {}),
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'relative',
          height: 0,
          paddingTop: aspectRatio
            ? `${aspectRatio * 100}%`
            : `${(+height / +width) * 100}%`,
          cursor: preview ? 'zoom-in' : 'default',
        }}
        className='img-blur'
        onClick={preview ? () => setIsOpen(true) : undefined}
      >
        <div className='absolute top-0 left-0'>
          <NextImage
            width={parseInt(`${width}`)}
            height={parseInt(`${height}`)}
            src={`${url}?format=webp&quality=50&fit=cover&height=${height}&width=${width}`}
            alt={alt}
            title={title || alt}
          />
        </div>
      </div>
      {isOpen && (
        <Lightbox mainSrc={url} onCloseRequest={() => setIsOpen(false)} />
      )}
    </figure>
  );
}
