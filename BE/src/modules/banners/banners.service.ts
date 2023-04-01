import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose-paginate-v2';
import { UploadService } from '../upload/upload.service';
import { BannerStatus } from './banner.constant';
import { IBannerDoc } from './banner.interface';
import { BANNER_MODEL } from './banner.schema';
import { CreateBannerDto } from './dto/create-banner.dto';
import { FindBannerDto } from './dto/find-admin-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { paginationTransformer } from 'src/common/helpers';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(BANNER_MODEL)
    private readonly bannerModel: PaginateModel<IBannerDoc>,
    private readonly uploadService: UploadService,
  ) {}
  async create(createBannerDto: CreateBannerDto) {
    createBannerDto.name = createBannerDto.name.trim();
    const regex = new RegExp(`^${createBannerDto.name}$`);
    const existingBanner = await this.bannerModel.findOne({
      name: { $regex: regex, $options: 'i' },
    });
    if (existingBanner) {
      throw new ConflictException(`Banner name already exist`);
    }

    if (createBannerDto.status === BannerStatus.Active) {
      const activeBanner = await this.bannerModel.findOne({
        status: BannerStatus.Active,
      });
      if (activeBanner) {
        await this.bannerModel.findByIdAndUpdate(
          activeBanner.id,
          { status: BannerStatus.Inactive },
          { new: true },
        );
      }
    }

    const banner = await this.bannerModel.create(createBannerDto);
    return banner;
  }

  async adminFindAll(findBannerDto: FindBannerDto) {
    const filters: Record<string, unknown> = {};
    const options: Record<string, unknown> = {};

    if (findBannerDto.status) {
      filters.status = findBannerDto.status;
    }
    if (findBannerDto.keyword) {
      filters.name = { $regex: '.*' + findBannerDto.keyword + '.*' };
    }

    options.page = findBannerDto.page;
    options.limit = findBannerDto.pageSize;
    options.sort = { createdAt: -1 };
    const banner = await this.bannerModel.paginate(filters);
    banner.docs.map((banner: any) => {
      if (banner.url) {
        banner.url = this.uploadService.getSignedUrl(banner.url);
      }
    });
    return paginationTransformer(banner);
  }
  async findOne(id: string) {
    const existingBanner = await this.bannerModel.findById(id);
    if (!existingBanner) {
      throw new NotFoundException(`Banner not found.`);
    }
    if (existingBanner.url) {
      existingBanner.url = this.uploadService.getSignedUrl(existingBanner.url);
    }
    return existingBanner;
  }

  async findActiveBanner() {
    const existingBanner = await this.bannerModel.findOne({
      status: BannerStatus.Active,
    });
    if (!existingBanner) {
      throw new NotFoundException(`No banner has status is active`);
    }
    if (existingBanner.url) {
      existingBanner.url = this.uploadService.getSignedUrl(existingBanner.url);
    }
    return existingBanner;
  }

  async update(id: string, updateBannerDto: UpdateBannerDto) {
    updateBannerDto.name = updateBannerDto.name.trim();
    const regex = new RegExp(`^${updateBannerDto.name}$`);
    const existingBanner = await this.bannerModel.findOne({
      _id: { $ne: id },
      name: { $regex: regex, $options: 'i' },
    });
    if (existingBanner) {
      throw new BadRequestException(`Banner name already exist`);
    }

    if (updateBannerDto.status === BannerStatus.Active) {
      const activeBanner = await this.findActiveBanner();
      if (activeBanner) {
        await this.bannerModel.findByIdAndUpdate(
          { _id: activeBanner.id },
          { status: BannerStatus.Inactive },
          { new: true },
        );
      }
    }

    if (updateBannerDto.status === BannerStatus.Inactive) {
      const currentBanner = await this.findOne(id);
      if (currentBanner && currentBanner.status === BannerStatus.Active) {
        throw new BadRequestException(`Can not update this banner to inactive`);
      }
    }
    const existingBannerLoop = await this.bannerModel.findByIdAndUpdate(
      { _id: id },
      updateBannerDto,
      { new: true },
    );
    if (!existingBannerLoop) {
      throw new NotFoundException(`Banner not found.`);
    }
  }

  async remove(id: string) {
    const banner = await this.findOne(id);
    if (banner.status === BannerStatus.Active) {
      throw new BadRequestException(`Can not delete an active banner.`);
    }
    const deletedBanner = await this.bannerModel.findByIdAndDelete(id);
    if (!deletedBanner) {
      throw new NotFoundException(`Banner not found.`);
    }
    return deletedBanner;
  }
}
