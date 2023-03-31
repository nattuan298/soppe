import { FileType } from '../product.constant';
import { IMediaFile } from '../interfaces/product.interface';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { IMultiLang } from '../interfaces/product.interface';

export class IMultiLangDto implements IMultiLang {
  @IsString()
  @IsOptional()
  en: string;

  @IsString()
  @IsOptional()
  th: string;
}

class MediaFile implements IMediaFile {
  url: string;
  fileType: FileType;
  position: number;
}
export class UpdateProductDto {
  isNewProduct: boolean;
  media: MediaFile[];
  description: IMultiLangDto;
}
