import Image from 'next/image';

import CustomCode, { Pre } from '@/components/content/CustomCode';
import SplitImage, { Split } from '@/components/content/SplitImage';
import CustomLink from '@/components/links/CustomLink';

const MDXComponents = {
  a: CustomLink,
  Image,
  pre: Pre,
  code: CustomCode,
  SplitImage,
  Split,
};

export default MDXComponents;
