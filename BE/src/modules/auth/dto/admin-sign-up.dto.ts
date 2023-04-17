import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
export class AdminSignUpDto {
  @IsNotEmpty()
  @IsDefined()
  @MinLength(6)
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
  @IsDefined()
  @IsPhoneNumber()
  phoneNumber: string;
}
