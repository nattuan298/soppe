import {
  CommonPaginationDto,
  PaginationResDto,
} from 'src/common/pagination.dto';
import { FileType, KeySort, ProductEndPoint } from '../product.constant';
import { IsDefined, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { IMultiLangDto } from './update-product.dto';
import { IMediaFile, IProductLegacy } from '../interfaces/product.interface';

export class FindProductsDto extends CommonPaginationDto {
  @IsOptional()
  keyword?: string;

  @IsOptional()
  category?: string;

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

  @IsOptional()
  memberId?: string;

  @IsEnum(ProductEndPoint)
  place: ProductEndPoint;
}

export class AdminFindProductsDto extends CommonPaginationDto {
  @IsOptional()
  keyword?: string;

  @IsOptional()
  category?: string;

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
}

export class FindProductsBySkuDto {
  @IsString({ each: true })
  productCode?: string[];

  @IsString()
  @IsOptional()
  memberId?: string;
}

export class FindOneProductDto {
  @IsString()
  productCode: string;
}

class MediaFile implements IMediaFile {
  url: string;
  fileType: FileType;
  position: number;
}
export class ResFindProductDto implements IProductLegacy {
  productCode: string;
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
  media?: MediaFile[];
  description: IMultiLangDto;
  isNewProduct: boolean;
  isFavourite: boolean;
  favouriteId: any;
  memberId: string;
  countApprovedReviews: number;
}

export class ResFindProductsDto extends PaginationResDto {
  data: ResFindProductDto[];
}
