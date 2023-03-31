import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const PRODUCT_MODEL = 'products';

const ProductSchema = new mongoose.Schema(
  {
    productName: String,
    isNewProduct: {
      type: Boolean,
      default: true,
    },
    mediaUrl: String,
    description: String,
    rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    categoryId: String,
    stock: Number,
    sold: Number,
    price: Number,
  },
  { timestamps: true },
);

ProductSchema.plugin(mongoosePaginate);
export { ProductSchema, PRODUCT_MODEL };
