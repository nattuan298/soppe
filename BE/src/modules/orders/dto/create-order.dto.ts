import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

class OrderProductDto {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}

class AddressDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDefined()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  address: string;
}

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  @IsObject({ each: true })
  products: OrderProductDto[];

  @IsNotEmpty()
  shippingAddress: AddressDto;
}
