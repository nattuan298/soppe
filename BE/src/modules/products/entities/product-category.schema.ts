import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const PRODUCT_CATEGORY_MODEL = 'product-category';
const ProductCategorySchema = new mongoose.Schema(
  {
    category: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

ProductCategorySchema.plugin(mongoosePaginate);
export { ProductCategorySchema, PRODUCT_CATEGORY_MODEL };
