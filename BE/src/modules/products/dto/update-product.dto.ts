import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  productName?: string;

  @IsBoolean()
  @IsOptional()
  isNewProduct?: boolean;

  @IsString()
  @IsOptional()
  mediaUrl?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  price?: number;
}
