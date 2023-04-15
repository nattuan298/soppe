export interface ApiListModel<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface ApiListProductsSections<T> {
  data: T[];
  countryCode: string;
}
