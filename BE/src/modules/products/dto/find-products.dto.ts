import {
  CommonPaginationDto,
  PaginationResDto,
} from 'src/common/pagination.dto';
import { KeySort } from '../product.constant';
import {
  IsDefined,
  IsMongoId,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IProductLegacy } from '../interfaces/product.interface';
import { ApiProperty } from '@nestjs/swagger';

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

  @IsOptional()
  keySort?: KeySort;

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
export class ResFindProductDto implements IProductLegacy {
  productName: string;
  pv: number;
  memberPrice: number;
  personalPrice: number;
  weight: number;
  categoryId: string;
  categoryName: string;
  sdate: string;
  edate: string;
  flag: string;
  status: string;
  rating: number;
  stock: number;
  sold: number;
  mediaUrl: string;
  description: string;
  isNewProduct: boolean;
  isFavourite: boolean;
  favouriteId: any;
  memberId: string;
  countApprovedReviews: number;
}

export class ResFindProductsDto extends PaginationResDto {
  data: ResFindProductDto[];
}
