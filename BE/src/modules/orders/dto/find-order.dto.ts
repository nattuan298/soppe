import {
  CommonPaginationDto,
  PaginationResDto,
} from './../../../common/pagination.dto';
import { IsDefined, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus, PaymentMethod } from '../orders.constant';
import { IAddress, IOrder, IProduct } from '../orders.interface';

export class FindOrderDto extends CommonPaginationDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsString()
  status?: OrderStatus;

  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsPositive()
  @IsDefined()
  page: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @IsPositive()
  @IsDefined()
  pageSize: number;
}
export class ResFindProductDto implements IOrder {
  orderStatus: OrderStatus;
  totalQuantity: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  products: [IProduct];
  shippingAddress: IAddress;
  userId: string;
  approveBy: string;
  completedAt: Date;
  _id: string;
}

export class ResFindOrderDto extends PaginationResDto {
  data: ResFindProductDto[];
}
