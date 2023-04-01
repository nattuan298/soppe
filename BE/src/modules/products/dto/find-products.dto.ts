import {
  CommonPaginationDto,
  PaginationResDto,
} from 'src/common/pagination.dto';
import {
  IsDefined,
  IsMongoId,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../interfaces/product.interface';

export class FindProductsDto extends CommonPaginationDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @IsOptional()
  @Transform((data) => +data.value)
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Transform((data) => +data.value)
  @Min(0)
  maxPrice?: number;

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
export class ResFindProductDto implements IProduct {
  productName: string;
  categoryId: string;
  status: string;
  rating: number;
  stock: number;
  sold: number;
  mediaUrl: string;
  description: string;
  isNewProduct: boolean;
  ratingCount: number;
  _id: string;
}

export class ResFindProductsDto extends PaginationResDto {
  data: ResFindProductDto[];
}
