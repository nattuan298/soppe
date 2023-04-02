import { IsNumberString, IsString } from 'class-validator';
import { CreateAddressDto } from './create-adrress.dto';

export class UpdateAddressDto extends CreateAddressDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumberString()
  phoneNumber: string;

  @IsString()
  address: string;
}
