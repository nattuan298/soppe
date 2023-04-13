export type StatusElement = "Active" | "Inactive";

export type ApiResponseError = {
  error?: string;
  message?: string;
  statusCode?: number;
};

export type CanError<T> = T & ApiResponseError;

export type List<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type SearchParams = {
  page?: number;
  pageSize?: number;
  keyword?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
};

export type CallbackResponse = {
  onSuccess?: () => void;
  onError?: (error?: ApiResponseError) => void;
};

export type FileType = "IMG" | "VIDEO";
export type FileExtension = "image/jpeg" | "image/png" | "image/jpg" | "image/gif" | "video/mp4";
