import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  Put,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  AdminFindProductsDto,
  FindOneProductDto,
  ResFindProductDto,
  ResFindProductsDto,
} from './dto/find-products.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommonIdParams } from '../../common/common.dto';
import { UpdateLocationPriceDto } from './dto/location-price.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/common.constants';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { RolesGuard } from 'src/common/guards/role.guard';

@ApiTags('admin')
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('products')
@Controller('admin/products')
export class ProductsAdminController {
  constructor(private readonly productsService: ProductsService) {}
  // @Get()
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({ type: ResFindProductsDto })
  // findAll(@Query() findProductsDto: AdminFindProductsDto) {
  //   return this.productsService.adminFindAll(findProductsDto);
  // }

  // @Get(':productCode')
  // @ApiBearerAuth()
  // @ApiResponse({ type: ResFindProductDto })
  // findOne(@Query() findOneProductDto: FindOneProductDto) {
  //   return this.productsService.adminFindOne(findOneProductDto);
  // }

  @Put(':productCode')
  @ApiBearerAuth()
  @ApiResponse({ type: UpdateProductDto })
  update(
    @Param('productCode') productCode: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(productCode, updateProductDto);
  }
}
