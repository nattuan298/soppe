import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from '../upload/upload.module';
import { ORDER_MODEL, OrderSchema } from './entities/orders.schema';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { AdminOrdersController } from './orders.admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ORDER_MODEL,
        schema: OrderSchema,
      },
    ]),
    forwardRef(() => UploadModule),
    forwardRef(() => ProductsModule),
    UsersModule,
  ],
  controllers: [OrdersController, AdminOrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
