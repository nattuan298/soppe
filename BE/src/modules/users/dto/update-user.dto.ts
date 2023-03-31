import {
  IsAlphanumeric,
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/common/common.constants';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumberString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  generation: string;

  @IsOptional()
  @IsEnum(Gender)
  @IsString()
  gender: Gender;

  @IsOptional()
  @IsString()
  @IsDateString()
  dateOfBirth: Date;

  @IsOptional()
  @IsString()
  avatar: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(8)
  @IsAlphanumeric()
  newPassword: string;
}

export class VerifyEmail {
  @IsString()
  username: string;

  @IsString()
  code: string;
}

export class SendVerifyCode {
  @IsString()
  username: string;
}

export class RecoveryPassword {
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(8)
  @IsAlphanumeric()
  password: string;
}
