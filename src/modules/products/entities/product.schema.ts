import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const PRODUCT_MODEL = 'products';

const ProductSchema = new mongoose.Schema(
  {
    productCode: String,
    isNewProduct: {
      type: Boolean,
      default: false,
    },
    media: [],
    description: String,
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

ProductSchema.plugin(mongoosePaginate);
export { ProductSchema, PRODUCT_MODEL };
