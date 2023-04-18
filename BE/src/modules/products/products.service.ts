import {
  BadRequestException,
  forwardRef,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadService } from '../upload/upload.service';
import { FindProductsDto } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  DELETE_POPULAR_KEY,
  FALSE,
  ProductResponseMessage,
} from './product.constant';
import { IProductDoc } from './interfaces/product.interface';
import { PRODUCT_MODEL } from './entities/product.schema';
import { POPULAR_KEY_MODEL } from './entities/popular-key.schema';
import { IPopularKeyDoc } from './interfaces/popular-key.interface';
import { PaginateModel } from 'mongoose-paginate-v2';
import { CommonIdParams } from './../../common/common.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { PRODUCT_CATEGORY_MODEL } from './entities/product-category.schema';
import { IProductCategoryDoc } from './interfaces/product-category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { paginationTransformer } from './../../common/helpers';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CheckStockDto, ProductCheckDto } from './dto/check-stock.dto';
import { FavouriteProductsService } from '../favourite-products/favourite-products.service';
import { ReviewsService } from '../reviews/reviews.service';
import { OrdersService } from '../orders/orders.service';
// import { ReviewStatus } from '../reviews/review.constant';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(PRODUCT_MODEL)
    private readonly productModel: PaginateModel<IProductDoc>,
    @InjectModel(POPULAR_KEY_MODEL)
    private readonly popularKeyModel: Model<IPopularKeyDoc>,
    @InjectModel(PRODUCT_CATEGORY_MODEL)
    private readonly productCategoryModel: PaginateModel<IProductCategoryDoc>,
    @Inject(forwardRef(() => UploadService))
    private readonly uploadService: UploadService,
    @Inject(forwardRef(() => FavouriteProductsService))
    private readonly favoriteProductsService: FavouriteProductsService,
    @Inject(forwardRef(() => ReviewsService))
    private readonly reviewsService: ReviewsService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: DELETE_POPULAR_KEY,
  })
  handleCron() {
    if (process.env.SCM_API_CRON_JOB === FALSE) {
      const job = this.schedulerRegistry.getCronJob(DELETE_POPULAR_KEY);
      return job.stop();
    }
    this.deletePopularKey();
  }

  async create(createProductDto: CreateProductDto) {
    const { productName } = createProductDto;
    const existProductName = await this.productModel.findOne({
      productName: productName.trim(),
    });
    if (existProductName) {
      throw new BadRequestException(ProductResponseMessage.NameExist);
    }
    await this.productModel.create(createProductDto);
  }

  async findAll(findProductsDto: FindProductsDto) {
    const { minPrice = 0, maxPrice = 0, keyword, categoryId } = findProductsDto;
    const input: Record<string, unknown> = {};
    const options: Record<string, unknown> = {};

    if (keyword) {
      const keywordRegex = new RegExp(
        keyword.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
        'i',
      );
      input.productName = keywordRegex;
      await this.popularKeyModel.create({
        keyword: keyword.toLowerCase().trim(),
      });
    }
    if (categoryId) {
      input.categoryId = categoryId;
    }
    if (maxPrice) {
      input.$or = [{ price: { $lte: maxPrice, $gte: minPrice } }];
    }

    options.page = findProductsDto.page;
    options.limit = findProductsDto.pageSize;
    options.sort = { createdAt: -1 };
    try {
      const products = await this.productModel.paginate(input, options);
      if (!products.docs.length) {
        return paginationTransformer(products);
      }
      products.docs.map((product: any) => {
        if (product.mediaUrl) {
          product.mediaUrl = this.uploadService.getSignedUrl(product.mediaUrl);
        }
      });
      return paginationTransformer(products);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: string, userId: string = null) {
    try {
      const product = await this.productModel.findById(id).lean();
      if (product.mediaUrl) {
        product.mediaUrl = this.uploadService.getSignedUrl(product.mediaUrl);
      }
      product.isFavorite = false;
      product.isAbleToReview = false;
      if (userId) {
        const [isFavorite, getIsAbleToReview] = await Promise.all([
          this.favoriteProductsService.findOne(id, userId),
          this.isProductAbleToReview(userId, id),
        ]);
        if (isFavorite) product.isFavorite = true;
        product.isAbleToReview = getIsAbleToReview;
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndNotReturnFullMediaUrl(id: string) {
    try {
      return await this.productModel.findById(id).lean();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update({ id }: CommonIdParams, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!existingProduct) {
      throw new NotFoundException(ProductResponseMessage.NotFound);
    }
    return existingProduct;
  }

  async popularKey() {
    const key = await this.popularKeyModel
      .aggregate([
        {
          $group: {
            _id: { keyword: '$keyword' },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ])
      .limit(5);

    return key.map((val) => val._id);
  }

  async deletePopularKey() {
    const CRONJOB_THIRTY_DAYS = +process.env.SCM_CRONJOB_THIRTY_DAYS || 30;
    const date = new Date();
    const thirtyDaysAgo = new Date(
      date.setDate(date.getDate() - CRONJOB_THIRTY_DAYS),
    ).toISOString();
    const popularKeys = await this.popularKeyModel.find({
      createdAt: {
        $lte: thirtyDaysAgo,
      },
    });
    if (popularKeys.length) {
      return Promise.all(
        popularKeys.map(async (key) => {
          await this.popularKeyModel.deleteOne({ _id: key._id });
        }),
      );
    }
  }

  async updateRatingAfterReview(
    id: string,
    rating: number,
    ratingCount: number,
  ) {
    await this.productModel.findByIdAndUpdate(
      id,
      { rating, ratingCount },
      { upsert: true, setDefaultsOnInsert: true },
    );
  }

  async createCategory({ category }: CreateCategoryDto) {
    // Get all category
    const listCategory = await this.productCategoryModel.find();
    const categoryExist: string[] = listCategory.map(
      (obj: any) => obj.category,
    );
    // Trim value
    const categoryTransform = category.map((val) => val.trim().toLowerCase());

    // Get unique category
    const uniqueCategory = categoryTransform.filter(
      (val: any) => !categoryExist.includes(val),
    );

    const dataInsert = uniqueCategory.map((category: any) => ({
      category,
    }));
    if (dataInsert.length) {
      return await this.productCategoryModel.insertMany(dataInsert);
    }
  }

  async getAllCategory() {
    const list = await this.productCategoryModel.find();
    if (!list.length) {
      throw new NotFoundException(`Empty category`);
    }
    list.map((obj: any) => {
      return (obj.category =
        obj.category.charAt(0).toUpperCase() + obj.category.slice(1));
    });
    return list;
  }

  async deleteProduct({ id }: CommonIdParams) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException(ProductResponseMessage.NotFound);
    }
  }

  async getTopProduct() {
    const productList = await this.productModel
      .find()
      .sort({ rating: -1 })
      .limit(5);
    if (productList) {
      productList.map((prod: any) => {
        prod.mediaUrl = this.uploadService.getSignedUrl(prod.mediaUrl);
      });
    }

    return productList;
  }

  async checkStock({ products }: CheckStockDto) {
    const productOutStock: any[] = [];
    await Promise.all(
      products.map(async (prod: ProductCheckDto) => {
        const product = await this.productModel.findById(prod.id).lean();
        if (product && product.stock < prod.quantity) {
          productOutStock.push(1);
          throw new BadRequestException(product.productName, `Out of stock`);
        }
      }),
    );
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  async isProductAbleToReview(userId: string, productId: string) {
    const [order, review] = await Promise.all([
      this.ordersService.findOrderReviewed(productId, userId),
      this.reviewsService.findOneReview(userId, productId),
    ]);
    if (review == undefined || order == undefined) {
      return true;
    } else if (review != undefined || order != undefined) {
      const product = order.products.filter((prod: any) => {
        return prod.productId === productId;
      });
      if (product[0].isReviewed) return false;
    }
  }

  async removeCategory(id: string) {
    const categoryDeleted = await this.productCategoryModel.findByIdAndDelete(
      id,
    );
    if (!categoryDeleted) {
      throw new NotFoundException(`Category is not found.`);
    }
  }
}
