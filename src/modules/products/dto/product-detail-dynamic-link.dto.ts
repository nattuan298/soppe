import { IsDefined, IsEnum, IsString } from 'class-validator';

export class ProductDetailDynamicLink {
  @IsString()
  @IsDefined()
  productCode: string;
}
