import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  category: string[];
}
