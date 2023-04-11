import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ORDER_MODEL } from './entities/orders.schema';
import { PaginateModel } from 'mongoose-paginate-v2';
import { UploadService } from '../upload/upload.service';
import { IOrderDoc } from './orders.interface';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { paginationTransformer } from 'src/common/helpers';
import { OrderStatus, ResponseOrderMessage } from './orders.constant';
import { FindOrderDto } from './dto/find-order.dto';

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
    let totalQuantity = 0;
    const products: any[] = [];

    for (let i = 0; i < createOrderDto.products.length; i++) {
      const prod = createOrderDto.products[i];
      const getProd =
        await this.productsService.findOneAndNotReturnFullMediaUrl(
          prod.productId,
        );

      totalPrice = totalPrice + prod.quantity * getProd.price;
      totalQuantity = totalQuantity + prod.quantity;

      products.push({
        mediaUrl: getProd.mediaUrl,
        productId: getProd._id,
        productName: getProd.productName,
        price: getProd.price,
        quantity: prod.quantity,
        categoryId: getProd.categoryId,
      });
    }
    const dataCreate = {
      products,
      totalPrice,
      totalQuantity,
      shippingAddress: createOrderDto.shippingAddress,
      userId,
    };
    return await this.orderModel.create(dataCreate);
  }

  async findAll(findProductsDto: FindOrderDto, userId: string = null) {
    const options: Record<string, unknown> = {};
    const filters: Record<string, unknown> = {};
    if (userId) {
      filters.userId = userId;
    }

    if (findProductsDto.status) {
      filters.orderStatus = findProductsDto.status;
    }

    options.page = findProductsDto.page;
    options.limit = findProductsDto.pageSize;
    options.sort = { createdAt: -1 };
    try {
      const orders = await this.orderModel.paginate(filters, options);

      if (!orders.docs.length) {
        return paginationTransformer(orders);
      }
      orders.docs.forEach((ord: any) => {
        ord.products.forEach((prod: any) => {
          const url = this.uploadService.getSignedUrl(prod.mediaUrl);
          prod.mediaUrl = url;
        });
      });

      return paginationTransformer(orders);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderModel.findById(id).lean();
      if (!order) {
        throw new NotFoundException(ResponseOrderMessage.NOT_FOUND);
      }
      order.products.forEach((prod: any) => {
        const url = this.uploadService.getSignedUrl(prod.mediaUrl);
        prod.mediaUrl = url;
      });
      return order;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async markReceived(id: string) {
    const order = await this.findOne(id);
    order.completedAt = Date.now();
    order.orderStatus = OrderStatus.RECEIPTED;
    order.products.forEach((el: any) => {
      el.ableToReview = true;
    });
    await this.orderModel.findByIdAndUpdate(id, order);
  }

  async adminApproveOrder(id: string, approveBy: string) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      {
        approveBy,
        orderStatus: OrderStatus.DELIVERY,
      },
      { new: true },
    );
    if (!order) {
      throw new NotFoundException(ResponseOrderMessage.NOT_FOUND);
    }
    return order;
  }

  async updateReviewed(orderId: string, productId: string) {
    await this.orderModel.findOneAndUpdate(
      {
        _id: orderId,
        'products.productId': productId,
      },
      { 'products.$.isReviewed': true },
      { new: true },
    );
  }

  async findOrderReviewed(orderId: string, productId: string, userId: string) {
    return await this.orderModel.findOne({
      _id: orderId,
      userId,
      'products.productId': productId,
      'products.isReviewed': true,
    });
  }
}
