import { IsNumberString, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumberString()
  phoneNumber: string;

  @IsString()
  address: string;
}
