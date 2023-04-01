import { IsEnum, IsOptional } from 'class-validator';
import {
  CommonPaginationDto,
  PaginationResDto,
} from '../../../common/pagination.dto';
import { BannerStatus } from '../banner.constant';
import { ResCreateBannerDto } from './create-banner.dto';

export class FindBannerDto extends CommonPaginationDto {
  @IsOptional()
  @IsEnum(BannerStatus)
  status?: BannerStatus;
}
export class ResFindBannerDto extends PaginationResDto {
  data: ResCreateBannerDto[];
}
