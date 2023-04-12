import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const REVIEW_PRODUCT_MODEL = 'review_product';
const ReviewProductSchema = new mongoose.Schema(
  {
    productId: String,
    userId: String,
    rating: Number,
    describe: String,
    mediaUrl: String,
  },
  { timestamps: true },
);

ReviewProductSchema.index(
  { userId: 1, productId: 1 },
  { unique: true, sparse: true },
);
ReviewProductSchema.plugin(mongoosePaginate);
export { ReviewProductSchema, REVIEW_PRODUCT_MODEL };
