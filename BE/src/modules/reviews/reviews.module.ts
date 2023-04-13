import { Module, forwardRef } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  REVIEW_PRODUCT_MODEL,
  ReviewProductSchema,
} from './entities/review.schema';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: REVIEW_PRODUCT_MODEL,
        schema: ReviewProductSchema,
      },
    ]),
    forwardRef(() => ProductsModule),
    forwardRef(() => OrdersModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
