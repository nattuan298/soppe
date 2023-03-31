import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AdminSignInDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
