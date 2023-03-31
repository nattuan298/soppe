import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateFavouriteProductDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  productId: string;
}
