import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

import {
  FindOneProductDto,
  FindProductsBySkuDto,
  FindProductsDto,
  ResFindProductDto,
  ResFindProductsDto,
} from './dto/find-products.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
