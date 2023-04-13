import { config } from "src/constants/config";
import { List, SearchParams } from "src/types/common.modal";
import { toQueryString } from "src/lib/common.lib";
import { ArticleCategory } from "src/types/news-article.model";
import { execute } from "src/lib/execute";

const URL = `${config.apiBaseUrl}/admin/cats-article`;
export function getNewsArticleCateService(params: SearchParams) {
  return execute.get<List<ArticleCategory>>(toQueryString(URL, params));
}

export function getAllNewsArticleCateService() {
  return execute.get<ArticleCategory[]>(`${URL}/all`);
}

export function addNewsArticleCateService(name: string) {
  return execute.post(URL, { name });
}

export function updateNewsArticleCateService(id: string, name: string) {
  return execute.patch(`${URL}/${id}`, { name });
}

export function deleteNewsArticleCateService(id: string) {
  return execute.delete(`${URL}/${id}`);
}
