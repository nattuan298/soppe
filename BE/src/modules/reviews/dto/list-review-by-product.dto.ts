import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ListReviewByProductDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;
}
