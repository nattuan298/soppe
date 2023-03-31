import * as mongoose from 'mongoose';

const POPULAR_KEY_MODEL = 'popular-key';
const PopularKeySchema = new mongoose.Schema(
  {
    keyword: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

export { PopularKeySchema, POPULAR_KEY_MODEL };
