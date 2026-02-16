export type CatalogeType = {
  _id: string;
  name: {
    en: string;
    ar: string;
    ru: string;
    fa: string;
  };
  cover: string;
  type: string;
  url?: string;
  file?: string;
};
