import { forwardRef, Module } from '@nestjs/common';
import { FavouriteProductsService } from './favourite-products.service';
import { FavouriteProductsController } from './favourite-products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FavouriteProductsSchema,
  FAVOURITE_PRODUCT_MODEL,
} from './favourite-products.schema';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FAVOURITE_PRODUCT_MODEL, schema: FavouriteProductsSchema },
    ]),
    forwardRef(() => ProductsModule),
  ],
  controllers: [FavouriteProductsController],
  providers: [FavouriteProductsService],
  exports: [FavouriteProductsService],
})
export class FavouriteProductsModule {}
