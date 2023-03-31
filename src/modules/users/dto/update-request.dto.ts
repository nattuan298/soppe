import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  createRequest: string;
}
