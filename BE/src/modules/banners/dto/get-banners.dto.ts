import { ApiProperty } from '@nestjs/swagger';

export class ResGetBannersDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  status: string;
}
