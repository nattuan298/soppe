import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BannersService } from './banners.service';
import { ResGetBannersDto } from './dto/get-banners.dto';

@ApiTags('banners')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  @ApiOkResponse({ type: ResGetBannersDto })
  findActiveBanner() {
    return this.bannersService.findActiveBanner();
  }
}
