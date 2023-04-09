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
import { CommonIdParams } from 'src/common/common.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { PRODUCT_CATEGORY_MODEL } from './entities/product-category.schema';
import { IProductCategoryDoc } from './interfaces/product-category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { paginationTransformer } from 'src/common/helpers';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CheckStockDto, ProductCheckDto } from './dto/check-stock.dto';
import { FavouriteProductsService } from '../favourite-products/favourite-products.service';
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
      input.productName = { $regex: '.*' + input.key_search + '.*' };
      await this.popularKeyModel.create({
        keyword: keyword.toLowerCase().trim(),
      });
    }
    if (categoryId) {
      input.categoryId = categoryId;
    }
    if (maxPrice) {
      input.min_price = minPrice;
      input.max_price = maxPrice;
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
      if (userId) {
        const isFavorite = await this.favoriteProductsService.findOne(
          id,
          userId,
        );
        if (isFavorite) product.isFavorite = true;
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update({ id }: CommonIdParams, updateProductDto: UpdateProductDto) {
    let existingProduct = await this.productModel.findById(id);
    if (!existingProduct) {
      existingProduct = new this.productModel({
        ...updateProductDto,
      });
    } else {
      existingProduct.mediaUrl = updateProductDto.mediaUrl;
      existingProduct.isNewProduct = updateProductDto.isNewProduct;
      existingProduct.description = updateProductDto.description;
      existingProduct.productName = updateProductDto.productName;
      existingProduct.stock = updateProductDto.stock;
      existingProduct.price = updateProductDto.price;
    }
    return existingProduct.save();
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
      await this.productCategoryModel.insertMany(dataInsert);
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
}
