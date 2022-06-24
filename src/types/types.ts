export type statusType = 'idle' | 'loading' | 'success' | 'error';

export type setStatusType = (status: statusType) => void;

export type EvenDate = {
  start: string;
  end: string;
};

export type ContactUsFormData = {
  name: string;
  email: string;
  message: string;
  phone: string;
};

export type PostType = {
  banner: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  tags: string[];
  dateCreated: string;
  dateUpdated: string | null;
  start: string | null;
  end: string | null;
  rank: number | null;
};

export type Translation = {
  key: string;
  locale: 'en' | 'zh-CN';
  text: string;
};

export type Translations = {
  [key: string]: string;
};

export type Link = {
  text: string;
  tooltip: string | null;
  href: string;
};

export type OurBelief = {
  text: string;
  ref: string;
  header: boolean;
};

export type OurLife = {
  icon: string | null;
  title: string;
  description: string;
  header: boolean;
};

export type Links = Link[];

export type AppContextType = {
  translations: Translations;
  links?: Links;
  memberPassword?: string;
  settings: Settings;
  preview?: boolean;
};

export type Settings = {
  [key: string]: string;
};
export type Setting = {
  key: string;
  value: string | boolean;
};

export type RawTranslationsType = {
  [key: string]: {
    [key: string]: string;
  };
};
export type RawDataWithTranslations = {
  [key: string]: {
    translations: RawTranslationsType;
  };
};
