import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommonIdParams } from '../../common/common.dto';
import { BannersService } from './banners.service';
import { CreateBannerDto, ResCreateBannerDto } from './dto/create-banner.dto';
import { FindBannerDto, ResFindBannerDto } from './dto/find-admin-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { RolesGuard } from 'src/common/guards/role.guard';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { Role } from 'src/common/common.constants';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('banners')
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(JwtGuard, RolesGuard)
@Controller('admin/banners')
export class BannersAdminController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @ApiOkResponse({ type: ResCreateBannerDto })
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannersService.create(createBannerDto);
  }

  @Get()
  @ApiOkResponse({ type: ResFindBannerDto })
  findAll(@Query() findBannerDto: FindBannerDto) {
    return this.bannersService.adminFindAll(findBannerDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResCreateBannerDto })
  findOne(@Param() params: CommonIdParams) {
    return this.bannersService.findOne(params.id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ResCreateBannerDto })
  update(
    @Param() params: CommonIdParams,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    return this.bannersService.update(params.id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param() params: CommonIdParams) {
    return this.bannersService.remove(params.id);
  }
}
