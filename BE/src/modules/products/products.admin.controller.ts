import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  Put,
  UseGuards,
  Post,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  FindProductsDto,
  ResFindProductDto,
  ResFindProductsDto,
} from './dto/find-products.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonIdParams } from '../../common/common.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/common.constants';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('admin')
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('products')
@Controller('admin/products')
export class ProductsAdminController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  @ApiResponse({ type: ResFindProductsDto })
  findAll(@Query() findProductsDto: FindProductsDto) {
    return this.productsService.findAll(findProductsDto);
  }

  @Post()
  @ApiResponse({ type: UpdateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':id')
  @ApiResponse({ type: ResFindProductDto })
  findOne(@Param() commonIdParams: CommonIdParams) {
    return this.productsService.findOne(commonIdParams.id);
  }

  @Put(':id')
  @ApiResponse({ type: UpdateProductDto })
  update(
    @Param() commonIdParams: CommonIdParams,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(commonIdParams, updateProductDto);
  }

  @Delete(':id')
  delete(@Param() commonIdParams: CommonIdParams) {
    return this.productsService.deleteProduct(commonIdParams);
  }

  @Post('/category')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.productsService.createCategory(body);
  }
}
