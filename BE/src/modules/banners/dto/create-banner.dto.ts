import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { BannerStatus } from '../banner.constant';

export class CreateBannerDto {
  @IsString()
  name: string;

  @IsEnum(BannerStatus)
  status: BannerStatus;

  @IsString()
  url: string;
}
export class ResCreateBannerDto extends CreateBannerDto {
  @ApiProperty()
  _id: string;
}
