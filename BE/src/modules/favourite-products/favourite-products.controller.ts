import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FavouriteProductsService } from './favourite-products.service';
import { CreateFavouriteProductDto } from './dto/create-favourite-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommonIdParams } from './../../common/common.dto';
import { JwtGuard } from './../../common/guards/jwt-guard';
import { GetUser } from './../../common/decorators/get-user.decorator';
import IJwtPayload from '../auth/payloads/jwt-payload';

@ApiTags('Favourite-products')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('favourite-products')
export class FavouriteProductsController {
  constructor(
    private readonly favouriteProductsService: FavouriteProductsService,
  ) {}

  @Post()
  create(
    @Body() createFavouriteProductDto: CreateFavouriteProductDto,
    @GetUser() { id }: IJwtPayload,
  ) {
    return this.favouriteProductsService.create(createFavouriteProductDto, id);
  }

  @Get()
  findAll(@GetUser() { id }: IJwtPayload) {
    return this.favouriteProductsService.findAll(id);
  }

  @Delete(':id')
  remove(@Param() { id }: CommonIdParams) {
    return this.favouriteProductsService.remove(id);
  }
}
