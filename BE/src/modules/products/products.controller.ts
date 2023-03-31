import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

import {
  FindProductsDto,
  ResFindProductDto,
  ResFindProductsDto,
} from './dto/find-products.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonIdParams } from 'src/common/common.dto';

@ApiTags('products')
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

  @Get(':id')
  @ApiResponse({ type: ResFindProductDto })
  findOne(@Param() commonIdParams: CommonIdParams) {
    return this.productsService.findOne(commonIdParams);
  }
}
