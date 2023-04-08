import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const ADDRESS_MODEL = 'address';

const AddressSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: String,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    province: String,
    district: String,
    sub_district: String,
  },
  { timestamps: true },
);

AddressSchema.plugin(mongoosePaginate);
export { AddressSchema, ADDRESS_MODEL };
