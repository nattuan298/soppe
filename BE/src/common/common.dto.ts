import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CommonIdParams {
  @IsMongoId()
  id: string;
}

export class MongoIdResDto {
  @ApiProperty({ example: '612340fcca16539ea5e29b88' })
  _id: string;
}
