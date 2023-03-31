import { IsDefined, IsEnum, IsNumber } from 'class-validator';
import { TypeMaxPrice } from '../product.constant';

export class FindOneDto {
  @IsEnum(TypeMaxPrice)
  type: TypeMaxPrice;
}

export class UpdateLocationPriceDto {
  @IsNumber()
  maxPrice: number;
}
