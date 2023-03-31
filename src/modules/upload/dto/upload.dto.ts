import { IsEnum, IsString } from 'class-validator';
import { ModuleName } from '../upload.constant';

export class FolderUploadDto {
  @IsEnum(ModuleName)
  @IsString()
  folder: ModuleName;
}
