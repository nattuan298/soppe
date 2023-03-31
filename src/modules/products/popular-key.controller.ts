import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('popular-keywords')
@Controller('popular-keywords')
export class PopularKeywordController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.popularKey();
  }
}
