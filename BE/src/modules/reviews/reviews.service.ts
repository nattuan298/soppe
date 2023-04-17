import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IReviewProductDoc } from './reviews.interface';
import { REVIEW_PRODUCT_MODEL } from './entities/review.schema';
import { ProductsService } from '../products/products.service';
import { PaginateModel } from 'mongoose-paginate-v2';
import { OrdersService } from '../orders/orders.service';
import { CommonPaginationDto } from './../../common/pagination.dto';
import { paginationTransformer } from './../../common/helpers';
import { UsersService } from '../users/users.service';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(REVIEW_PRODUCT_MODEL)
    private readonly reviewProductModel: PaginateModel<IReviewProductDoc>,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => UploadService))
    private readonly uploadService: UploadService,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: string) {
    const reviewExist = await this.ordersService.findOrderReviewed(
      createReviewDto.productId,
      userId,
    );
    if (reviewExist) {
      throw new BadRequestException(`You already review this product.`);
    }

    const [product, user] = await Promise.all([
      this.productsService.findOne(createReviewDto.productId),
      this.usersService.findByIdNotReturnFullImage(userId),
    ]);
    const rating =
      product.ratingCount != 0
        ? (createReviewDto.rating + product.rating) / 2
        : createReviewDto.rating;
    const ratingCount = product.ratingCount + 1;

    const [, , reviewed] = await Promise.all([
      this.productsService.updateRatingAfterReview(
        createReviewDto.productId,
        rating,
        ratingCount,
      ),
      this.ordersService.updateReviewed(userId, createReviewDto.productId),
      this.reviewProductModel.create({
        ...createReviewDto,
        userId,
        username: user.username,
        avatar: user.avatar,
      }),
    ]);
    return reviewed;
  }

  async findAll(productId: string, commonPaginationDto: CommonPaginationDto) {
    const options: Record<string, unknown> = {};
    const inputs: Record<string, unknown> = {};
    inputs.productId = productId;

    options.page = commonPaginationDto.page;
    options.limit = commonPaginationDto.pageSize;
    options.sort = { createdAt: -1 };
    const reviews = await this.reviewProductModel.paginate(inputs, options);
    if (!reviews.docs.length) {
      return paginationTransformer(reviews);
    }
    reviews.docs.map((review: any) => {
      if (review.mediaUrl) {
        review.mediaUrl = this.uploadService.getSignedUrl(review.mediaUrl);
      }
      if (review.avatar) {
        review.avatar = this.uploadService.getSignedUrl(review.avatar);
      }
    });
    return paginationTransformer(reviews);
  }

  async findOneReview(userId: string, productId: string) {
    return await this.reviewProductModel.findOne({ userId, productId });
  }
}
