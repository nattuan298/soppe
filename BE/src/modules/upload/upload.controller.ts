import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
  Body,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { Express } from 'express';
import { FolderUploadDto } from './dto/upload.dto';
import { ApiFile } from 'src/common/helpers';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() folderUploadDto: FolderUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadPublicFile(
      folderUploadDto.folder,
      file.buffer,
      file.originalname,
      file.mimetype,
    );
  }

  @Get()
  getSignedUrl(@Query('key') key: string) {
    return this.uploadService.getSignedUrl(key);
  }

  @Delete()
  deleteFile(@Query('key') key: string) {
    return this.uploadService.deletePublicFile(key);
  }
}
