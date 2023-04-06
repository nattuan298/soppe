import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ORDER_MODEL } from './entities/orders.schema';
import { PaginateModel } from 'mongoose-paginate-v2';
import { UploadService } from '../upload/upload.service';
import { IOrderDoc } from './orders.interface';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(ORDER_MODEL)
    private readonly orderModel: PaginateModel<IOrderDoc>,
    private readonly productsService: ProductsService,
    @Inject(forwardRef(() => UploadService))
    private readonly uploadService: UploadService,
    private readonly usersService: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    let totalPrice = 0;
    let totalProduct = 0;
    const products: any[] = [];

    const [, getBuyer] = await Promise.all([
      createOrderDto.products.map(async (prod) => {
        const getProd = await this.productsService.findOne(prod.productId);

        totalPrice = totalPrice + prod.quantity * getProd.price;
        totalProduct = totalProduct + prod.quantity;

        return products.push({
          mediaUrl: getProd.mediaUrl,
          productId: getProd._id,
          productName: getProd.productName,
          price: getProd.price,
          quantity: prod.quantity,
          categoryId: getProd.categoryId,
        });
      }),
      this.usersService.findById(userId),
    ]);
    const buyer = {
      name: getBuyer.firstName + ' ' + getBuyer.lastName,
      avatar: getBuyer.avatar,
      phoneNumber: getBuyer.phoneNumber,
      userId: getBuyer._id,
    };

    const dataCreate = {
      products,
      totalPrice,
      totalProduct,
      shippingAddress: createOrderDto.shippingAddress,
      buyer,
    };
    return await this.orderModel.create(dataCreate);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
