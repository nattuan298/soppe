export interface CategoryModel {
  _id: string;
  categoryId: string;
  categoryName: string;
  image: string;
  bubble: string;
  createdAt: string;
  updatedAt: string;
}
export const GET_CATEGORIES = "GET_CATEGORIES";
