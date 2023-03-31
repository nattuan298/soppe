import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/common/common.constants';

export class UserSignUpDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

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

  @ApiProperty({ example: 'avatar/avatar1.png' })
  @IsString()
  avatar: string;

  @IsEnum(Gender)
  @IsString()
  gender: Gender;

  @IsString()
  @IsDateString()
  dateOfBirth: Date;
}
