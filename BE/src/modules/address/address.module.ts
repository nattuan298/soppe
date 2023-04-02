import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema, ADDRESS_MODEL } from './address.schema';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ADDRESS_MODEL,
        schema: AddressSchema,
      },
    ]),
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
