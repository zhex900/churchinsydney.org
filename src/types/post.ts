import { ReadTimeResults } from 'reading-time';

export type PostType = {
  banner: {
    url: string;
  };
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  content: string;
  lastUpdated: string;
  tags: string[];
  readingTime: ReadTimeResults;
  views?: number;
  likes?: number;
};
