import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
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
  @IsNumberString()
  phoneNumber: string;

  @ApiProperty({ example: 'avatar/avatar1.png' })
  @IsString()
  avatar: string;
}
