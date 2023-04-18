import {
  IsBoolean,
  IsNegative,
  IsNumber,
  IsOptional,
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

  @IsNegative()
  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsNegative()
  @IsNumber()
  @IsOptional()
  price?: number;
}
