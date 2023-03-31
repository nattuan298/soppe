import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class FindOneFavouriteProductDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  productCode: string;
}
