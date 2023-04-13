import { SearchParams, StatusElement } from "./common.modal";

export interface ArticleCategory {
  status: StatusElement;
  totalArticle: number;
  totalView: number;
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}
export interface NewsArticle {
  _id: string;
  name: {
    en: string | null;
    th: string | null;
  };
  category: string;
  status: StatusElement;
  image?: string;
  imageUrl?: string;
  startPublishDate?: string;
  endPublishDate?: string;
  content: {
    en: string | null;
    th: string | null;
  };
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface NewsArticle2 {
  name: {
    en: string | null;
    th: string | null;
  };
  status: string;
  category: string;
  image: string;
  imageUrl?: string;
  startPublishDate: string | undefined;
  endPublishDate: string | undefined;
  content: {
    en: string | null;
    th: string | null;
  };
}
export type NewsArticleParams = SearchParams & {
  startPublishDate?: string;
  endPublishDate?: string;
  category?: string;
};
