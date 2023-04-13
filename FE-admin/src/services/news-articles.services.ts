import { config } from "src/constants/config";
import { ApiResponseError, List } from "src/types/common.modal";
import { toQueryString } from "src/lib/common.lib";
import { NewsArticle, NewsArticle2, NewsArticleParams } from "src/types/news-article.model";
import { execute } from "src/lib/execute";

const URL = `${config.apiBaseUrl}/admin/articles`;
export function getNewsArticleService(params: NewsArticleParams) {
  return execute.get<List<NewsArticle>>(toQueryString(URL, params));
}

export function getDetailNewsArticleService(id: string) {
  return execute.get<NewsArticle>(`${URL}/${id}`);
}

export function addNewsArticleService(payload: Partial<NewsArticle>) {
  return execute.post(URL, payload);
}

export function updateNewsArticleService(id: string, payload: NewsArticle2) {
  return execute.patch<ApiResponseError>(`${URL}/${id}`, payload);
}

export function deleteNewsArticleService(id: string) {
  return execute.delete<ApiResponseError>(`${URL}/${id}`);
}
export function activeService(id: string | undefined) {
  return execute.put<ApiResponseError>(`${URL}/activate/${id}`);
}
export function inActiveService(id: string | undefined) {
  return execute.put<ApiResponseError>(`${URL}/deactivate/${id}`);
}
