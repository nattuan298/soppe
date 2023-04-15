import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const ADDRESS_MODEL = 'address';

const AddressSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    addressDetail: String,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    province: String,
    district: String,
    subDistrict: String,
  },
  { timestamps: true },
);

AddressSchema.plugin(mongoosePaginate);
export { AddressSchema, ADDRESS_MODEL };
