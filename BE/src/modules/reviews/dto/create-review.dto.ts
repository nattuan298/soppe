import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReviewDto {
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsOptional()
  describe?: string;

  @IsString()
  @IsOptional()
  mediaUrl?: string;
}
