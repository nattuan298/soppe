import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/common/common.constants';
import { CommonPaginationDto } from 'src/common/pagination.dto';

export class AdminFindUserDto extends CommonPaginationDto {
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({ example: '2021-07-24T10:15:26.658Z', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty({ example: '2022-07-24T10:15:26.658Z', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsString()
  @IsOptional()
  keyword?: string;
}
