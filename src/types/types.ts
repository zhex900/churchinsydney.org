import { ReadTimeResults } from 'reading-time';

export type EvenDate = {
  startDate: string;
  endDate: string;
};

export type PostType = {
  banner: {
    url: string;
  };
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  content: string;
  updatedAt: string;
  tags: string[];
  readingTime: ReadTimeResults;
  views?: number;
  likes?: number | null;
  rank: number | null;
  hidden: boolean;
  eventDate?: EvenDate;
};

export type Translation = {
  key: string;
  locale: 'en' | 'zh-CN';
  text: string;
};

export type Translations = {
  [key: string]: Translation;
};

export type Link = {
  text: string;
  tooltip?: string;
  href: string;
};

export type ourBelief = {
  text: string;
  ref: string;
  isHeader: boolean;
};

export type ourLife = {
  icon: string | null;
  title: string;
  description: string;
  isHeader: boolean;
};

export type Links = Link[];

export type AppContextType = {
  translations: Translations;
  links?: Links;
  memberPassword?: string;
  settings: Settings;
};

export type Settings = {
  [key: string]: string;
};
export type Setting = {
  key: string;
  value: string;
};
