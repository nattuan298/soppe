import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { FavouriteProductsService } from './favourite-products.service';
import { CreateFavouriteProductDto } from './dto/create-favourite-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommonIdParams } from 'src/common/common.dto';
import { Request } from 'express';

@ApiTags('favourite-products')
@ApiBearerAuth()
@UseGuards(AuthGuard('verifyMember'))
@Controller('favourite-products')
export class FavouriteProductsController {
  constructor(
    private readonly favouriteProductsService: FavouriteProductsService,
  ) {}

  @Post()
  create(
    @Body() createFavouriteProductDto: CreateFavouriteProductDto,
    @Param('memberId') memberId: string,
  ) {
    return this.favouriteProductsService.create(
      createFavouriteProductDto,
      memberId,
    );
  }

  @Get()
  findAll(@Param('memberId') memberId: string) {
    return this.favouriteProductsService.findAll(memberId);
  }

  @Delete(':id')
  remove(@Param() params: CommonIdParams) {
    return this.favouriteProductsService.remove(params.id);
  }
}
