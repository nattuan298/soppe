export const FAVORITE_PRODUCT_GET_DATA = "FAVORITE_PRODUCT_GET_DATA";
export const DELETE_FAVORITE_PRODUCT = "DELETE_FAVORITE_PRODUCT";

export type getFavoriteProductActionProps = {
  type: typeof FAVORITE_PRODUCT_GET_DATA;
  payload: { countryCode: string };
};

export type deleteFavoriteProductActionProps = {
  type: typeof DELETE_FAVORITE_PRODUCT;
  payload: {
    id?: string;
  };
};
