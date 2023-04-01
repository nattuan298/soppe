import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { BannerStatus } from './banner.constant';

const BANNER_MODEL = 'banners';
const BannerSchema = new mongoose.Schema(
  {
    name: String,
    status: {
      type: String,
      enum: BannerStatus,
      default: BannerStatus.Inactive,
    },
    url: String,
  },
  { timestamps: true },
);

BannerSchema.plugin(mongoosePaginate);
export { BannerSchema, BANNER_MODEL };
