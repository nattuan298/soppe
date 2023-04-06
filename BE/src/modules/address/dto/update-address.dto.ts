import {
  IsDefined,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends CreateAddressDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDefined()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  address: string;
}
