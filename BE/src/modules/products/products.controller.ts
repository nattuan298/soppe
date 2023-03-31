import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';

import {
  FindOneProductDto,
  FindProductsDto,
  ResFindProductDto,
  ResFindProductsDto,
} from './dto/find-products.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards/jwt-guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({ type: ResFindProductsDto })
  findAll(@Query() findProductsDto: FindProductsDto) {
    return this.productsService.findAll(findProductsDto);
  }

  // @Get('list')
  // findProductBySku(@Query() findProductsBySkuDto: FindProductsBySkuDto) {
  //   return this.productsService.listProductBySku(findProductsBySkuDto);
  // }

  @Get(':productCode')
  @ApiResponse({ type: ResFindProductDto })
  findOne(@Query() findOneProductDto: FindOneProductDto) {
    return this.productsService.findOne(findOneProductDto);
  }
}
