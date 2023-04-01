import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerSchema, BANNER_MODEL } from './banner.schema';
import { UploadModule } from '../upload/upload.module';
import { BannersAdminController } from './banners.admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BANNER_MODEL,
        schema: BannerSchema,
      },
    ]),
    UploadModule,
  ],
  controllers: [BannersController, BannersAdminController],
  providers: [BannersService],
  exports: [BannersService],
})
export class BannersModule {}
