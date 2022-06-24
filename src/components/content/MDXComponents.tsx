import Image from 'next/image';

import SplitImage, { Split } from '@/components/content/SplitImage';
import CustomLink from '@/components/links/CustomLink';

const MDXComponents = {
  a: CustomLink,
  Image,
  SplitImage,
  Split,
};

export default MDXComponents;
