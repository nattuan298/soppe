import {
  IsAlphanumeric,
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/common/common.constants';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDefined()
  @MinLength(8)
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(8)
  @IsAlphanumeric()
  password: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;

  @IsEnum(Gender)
  @IsString()
  gender: Gender;

  @IsString()
  @IsDateString()
  dateOfBirth: Date;
}
