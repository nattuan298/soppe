import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './../../common/guards/jwt-guard';
import { GetUser } from './../../common/decorators/get-user.decorator';
import IJwtPayload from '../auth/payloads/jwt-payload';
import { CommonPaginationDto } from './../../common/pagination.dto';
import { ListReviewByProductDto } from './dto/list-review-by-product.dto';

@ApiTags('Review')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() { id }: IJwtPayload,
  ) {
    return this.reviewsService.create(createReviewDto, id);
  }

  @Get(':productId')
  findAll(
    @Param() { productId }: ListReviewByProductDto,
    @Query() commonPaginationDto: CommonPaginationDto,
  ) {
    return this.reviewsService.findAll(productId, commonPaginationDto);
  }
}
