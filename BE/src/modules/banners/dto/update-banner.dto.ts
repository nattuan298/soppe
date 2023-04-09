import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BannerStatus } from '../banner.constant';

export class UpdateBannerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(BannerStatus)
  status?: BannerStatus;
}
