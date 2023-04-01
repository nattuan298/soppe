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
import {
  PRODUCT_CATEGORY_MODEL,
  ProductCategorySchema,
} from './entities/product-category.schema';
import { ScheduleModule } from '@nestjs/schedule';

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
      {
        name: PRODUCT_CATEGORY_MODEL,
        schema: ProductCategorySchema,
      },
    ]),
    forwardRef(() => UploadModule),
    ScheduleModule.forRoot(),
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
