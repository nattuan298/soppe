import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPositive,
} from 'class-validator';

export class ProductCheckDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsPositive()
  @IsNumber()
  quantity: number;
}

export class CheckStockDto {
  @IsArray()
  @IsObject({ each: true })
  @IsNotEmpty()
  products: ProductCheckDto[];
}
