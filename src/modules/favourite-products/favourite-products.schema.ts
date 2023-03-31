import * as mongoose from 'mongoose';

const FAVOURITE_PRODUCT_MODEL = 'favourite-products';
const FavouriteProductsSchema = new mongoose.Schema(
  {
    productCode: String,
    memberId: String,
  },
  { timestamps: true },
);

export { FavouriteProductsSchema, FAVOURITE_PRODUCT_MODEL };
