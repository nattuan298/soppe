import { IsEnum, IsString } from 'class-validator';
import { FolderName } from '../upload.constant';

export class FolderUploadDto {
  @IsEnum(FolderName)
  @IsString()
  folder: FolderName;
}
