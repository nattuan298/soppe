import { IsDefined, IsPhoneNumber, IsString } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends CreateAddressDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDefined()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  province: string;

  @IsString()
  district: string;

  @IsString()
  sub_district: string;
}
