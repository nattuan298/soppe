import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsAdminController } from './products.admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, PRODUCT_MODEL } from './entities/product.schema';
import { UploadModule } from '../upload/upload.module';
import {
  PopularKeySchema,
  POPULAR_KEY_MODEL,
} from './entities/popular-key.schema';
import { PopularKeywordController } from './popular-key.controller';
import { FavouriteProductsModule } from '../favourite-products/favourite-products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PRODUCT_MODEL,
        schema: ProductSchema,
      },
      {
        name: POPULAR_KEY_MODEL,
        schema: PopularKeySchema,
      },
    ]),
    forwardRef(() => UploadModule),
    forwardRef(() => FavouriteProductsModule),
  ],
  controllers: [
    ProductsController,
    ProductsAdminController,
    PopularKeywordController,
  ],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
