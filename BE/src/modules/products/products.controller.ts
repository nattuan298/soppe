import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

import {
  FindOneProduct,
  FindProductsDto,
  ResFindProductDto,
  ResFindProductsDto,
} from './dto/find-products.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonIdParams } from './../../common/common.dto';
import { CheckStockDto } from './dto/check-stock.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({ type: ResFindProductsDto })
  findAll(@Query() findProductsDto: FindProductsDto) {
    return this.productsService.findAll(findProductsDto);
  }

  @Get('/category')
  findAllCategory() {
    return this.productsService.getAllCategory();
  }

  @Get('/top-product')
  getTopProduct() {
    return this.productsService.getTopProduct();
  }

  @Get(':id')
  @ApiResponse({ type: ResFindProductDto })
  findOne(
    @Param() commonIdParams: CommonIdParams,
    @Query() { userId }: FindOneProduct,
  ) {
    return this.productsService.findOne(commonIdParams.id, userId);
  }

  @Post('/check-stock')
  checkStock(@Body() products: CheckStockDto) {
    return this.productsService.checkStock(products);
  }
}
