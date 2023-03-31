import {
  forwardRef,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadService } from '../upload/upload.service';
import { FindOneProductDto, FindProductsDto } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  DELETE_POPULAR_KEY,
  FALSE,
  KeySort,
  ProductKeyBy,
  ProductKeyFilter,
} from './product.constant';
import {
  IProductDoc,
  IProductLegacy,
  IMediaFile,
} from './interfaces/product.interface';
import { PRODUCT_MODEL } from './entities/product.schema';
import { POPULAR_KEY_MODEL } from './entities/popular-key.schema';
import { IPopularKeyDoc } from './interfaces/popular-key.interface';
import { FavouriteProductsService } from '../favourite-products/favourite-products.service';
import { PaginateModel } from 'mongoose-paginate-v2';
// import { ReviewStatus } from '../reviews/review.constant';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(PRODUCT_MODEL)
    private readonly productModel: PaginateModel<IProductDoc>,
    @InjectModel(POPULAR_KEY_MODEL)
    private readonly popularKeyModel: Model<IPopularKeyDoc>,
    @Inject(forwardRef(() => UploadService))
    private readonly uploadService: UploadService,
    @Inject(forwardRef(() => FavouriteProductsService))
    private readonly favouriteProductsService: FavouriteProductsService,
  ) {}

  // handleCron() {
  //   if (process.env.POPULAR_KEY_CRON_JOB === FALSE) {
  //     const job = this.schedulerRegistry.getCronJob(DELETE_POPULAR_KEY);
  //     return job.stop();
  //   }
  //   this.deletePopularKey();
  // }

  async findAll(findProductsDto: FindProductsDto) {
    const {
      minPrice = 0,
      maxPrice = 0,
      place,
      keyword,
      category,
      pageSize,
      page,
      keySort,
      memberId,
    } = findProductsDto;
    const input: Record<string, unknown> = {
      key_filter: ProductKeyFilter.Price,
      key_by: ProductKeyBy.Personal,
      key_group: 0,
    };
    const options: Record<string, unknown> = {};
    if (keyword) {
      input.key_search = keyword;
      await this.popularKeyModel.create({
        keyword: keyword.toLowerCase().trim(),
      });
    }
    if (category) {
      input.key_group = category;
    }
    if (maxPrice) {
      input.min_price = minPrice;
      input.max_price = maxPrice;
    }
    if (pageSize) {
      input.per_page = pageSize;
    }
    if (page) {
      input.start_page = page;
    }
    if (keySort) {
      input.key_sort = keySort;

      if (
        keySort === KeySort.BySKUFromAToZ ||
        keySort === KeySort.BySKUFromZToA
      ) {
        input.key_filter = ProductKeyFilter.Code;
      }
    }
    if (memberId) {
      input.key_by = ProductKeyBy.Member;
    }

    options.page = findProductsDto.page;
    options.limit = findProductsDto.pageSize;
    options.sort = { createdAt: -1 };
    try {
      const products = await this.productModel.paginate(input, options);
      return products;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // async adminFindAll(findProductsDto: AdminFindProductsDto) {
  //   const { minPrice = 0, maxPrice = 0 } = findProductsDto;
  //   const input: Record<string, unknown> = {
  //     key_filter: 'Price',
  //     key_group: 0,
  //   };
  //   if (findProductsDto.countryCode) {
  //     input.location_id = findProductsDto.countryCode;
  //   }
  //   if (findProductsDto.keyword) {
  //     input.key_search = findProductsDto.keyword;
  //   }
  //   if (findProductsDto.category) {
  //     input.key_group = findProductsDto.category;
  //   }
  //   if (findProductsDto.maxPrice) {
  //     input.min_price = minPrice;
  //     input.max_price = maxPrice;
  //   }
  //   if (findProductsDto.pageSize) {
  //     input.per_page = findProductsDto.pageSize;
  //   }
  //   if (findProductsDto.page) {
  //     input.start_page = findProductsDto.page;
  //   }
  //   if (findProductsDto.keySort) {
  //     input.key_sort = findProductsDto.keySort;
  //   }
  //   try {
  //     const legacyResponse = await this.apiClientService.get(
  //       `${process.env.LEGACY_API}/Product_Package/Product`,
  //       {
  //         params: input,
  //       },
  //     );
  //     const { DATA, ROW } = legacyResponse.data;

  //     if (Array.isArray(DATA)) {
  //       const existingProducts = await this.productModel.aggregate([
  //         {
  //           $lookup: {
  //             from: 'reviews',
  //             localField: 'productCode',
  //             foreignField: 'sku',
  //             as: 'reviews',
  //           },
  //         },
  //         {
  //           $addFields: {
  //             approvedReviews: {
  //               $filter: {
  //                 input: '$reviews',
  //                 as: 'review',
  //                 cond: {
  //                   $eq: ['$$review.status', ReviewStatus.Approved],
  //                 },
  //               },
  //             },
  //           },
  //         },
  //         {
  //           $match: {
  //             productCode: {
  //               $in: DATA.map((product) => product.product_code),
  //             },
  //           },
  //         },
  //         {
  //           $project: {
  //             productCode: 1,
  //             isNewProduct: 1,
  //             media: 1,
  //             description: 1,
  //             rating: 1,
  //             countApprovedReviews: {
  //               $size: '$approvedReviews',
  //             },
  //             approvedReviews: 1,
  //           },
  //         },
  //       ]);

  //       const data = DATA.map((val) => {
  //         const productDetail = existingProducts.find(
  //           (p) => p.productCode === val.product_code,
  //         );
  //         return this.productTransformer(val, productDetail);
  //       });

  //       return {
  //         data,
  //         total: ROW,
  //         page: +findProductsDto.page,
  //         limit: +findProductsDto.pageSize,
  //       };
  //     }

  //     return {
  //       data: [],
  //       total: 0,
  //       page: +findProductsDto.page,
  //       limit: +findProductsDto.pageSize,
  //     };
  //   } catch (error) {
  //     if (error?.response.status) {
  //       return {
  //         data: [],
  //         total: 0,
  //         page: +findProductsDto.page,
  //         limit: +findProductsDto.pageSize,
  //       };
  //     } else {
  //       throw new ServiceUnavailableException({ key: 'translate.LegacyError' });
  //     }
  //   }
  // }

  // async listProductBySku(findProductsBySkuDto: FindProductsBySkuDto) {
  //   const input: Record<string, unknown> = {};
  //   if (findProductsBySkuDto.countryCode) {
  //     input.location_id = findProductsBySkuDto.countryCode;
  //   }
  //   if (findProductsBySkuDto.productCode) {
  //     input.product_array =
  //       typeof findProductsBySkuDto.productCode === 'string'
  //         ? [findProductsBySkuDto.productCode]
  //         : findProductsBySkuDto.productCode;
  //   }
  //   try {
  //     const { DATA } = await this.callApiProductPackageArray(input);

  //     if (Array.isArray(DATA)) {
  //       const data = await this.findProductData(DATA);
  //       if (findProductsBySkuDto.memberId) {
  //         await this.mapFavouriteProduct(
  //           data.data,
  //           findProductsBySkuDto.memberId,
  //         );
  //       }

  //       return data;
  //     }
  //     return {
  //       data: [],
  //     };
  //   } catch (error) {
  //     if (error?.response.status) {
  //       throw new NotFoundException({ key: 'translate.ProductNotFound' });
  //     } else {
  //       throw new ServiceUnavailableException({ key: 'translate.LegacyError' });
  //     }
  //   }
  // }

  // async adminFindOne(findOneProductDto: FindOneProductDto) {
  //   const input: Record<string, unknown> = {};

  //   if (findOneProductDto.countryCode) {
  //     input.location_id = findOneProductDto.countryCode;
  //   }
  //   if (findOneProductDto.productCode) {
  //     input.product_array = [findOneProductDto.productCode];
  //   }

  //   const { DATA } = await this.callApiProductPackageArray(input);

  //   const product = await this.productModel.findOne({
  //     productCode: DATA[0].product_code,
  //   });

  //   if (Array.isArray(DATA) && DATA.length) {
  //     return this.productTransformer(DATA[0], product);
  //   }

  //   throw new NotFoundException({ key: 'translate.ProductNotFound' });
  // }

  async findOne(findOneProductDto: FindOneProductDto) {
    const input: Record<string, unknown> = {};
    if (findOneProductDto.productCode) {
      input.product_array = [findOneProductDto.productCode];
    }
    try {
      const product = await this.productModel.findOne({
        productCode: findOneProductDto.productCode,
      });
      return product;
    } catch (error) {
      throw new NotFoundException(error, 'Not found');
    }
  }

  async update(productCode: string, updateProductDto: UpdateProductDto) {
    let existingProduct = await this.productModel.findOne({ productCode });
    if (!existingProduct) {
      existingProduct = new this.productModel({
        ...updateProductDto,
        productCode,
      });
    } else {
      existingProduct.media = updateProductDto.media;
      existingProduct.isNewProduct = updateProductDto.isNewProduct;
      existingProduct.description = updateProductDto.description;
    }
    return existingProduct.save();
  }

  productTransformer(product, existingProduct): IProductLegacy {
    let media = [];
    if (existingProduct?.media && existingProduct.media.length) {
      media = existingProduct.media.map((val: IMediaFile) => {
        return {
          url: val.url || '',
          urlPreSign: val.url
            ? `${process.env.AWS_S3_PUBLIC_URL}/${val.url}`
            : '',
          fileType: val.fileType,
          position: val.position,
        };
      });
    }
    return {
      productCode: product.product_code,
      productName: product.product_name,
      pv: +product.pv,
      memberPrice: +product.member_price,
      personalPrice: +product.personal_price,
      weight: +product.weight,
      categoryId: product.category,
      sdate: product.sdate,
      edate: product.edate,
      flag: product.flag,
      media,
      status: product.statuss,
      rating: existingProduct?.rating || 0,
      stock: 0,
      sold: 0,
      description: {
        en: existingProduct?.description?.en || '',
        th: existingProduct?.description?.th || '',
      },
      isNewProduct: existingProduct?.isNewProduct || false,
      isFavourite: null,
      favouriteId: null,
      memberId: null,
      countApprovedReviews: existingProduct?.countApprovedReviews || 0,
    };
  }

  async findProductData(DATA) {
    const existingProducts = await this.productModel
      .find({
        productCode: {
          $in: DATA.map((product) => product.product_code),
        },
      })
      .lean();
    const data = await Promise.all(
      DATA.map((val) => {
        const productDetail = existingProducts.filter(
          (p) => p.productCode === val.product_code,
        );
        return this.productTransformer(val, productDetail[0]);
      }),
    );
    return { data };
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

  async updateRatingAfterReview(productCode: string, rating: number) {
    await this.productModel.updateOne(
      { productCode },
      { rating },
      { upsert: true, setDefaultsOnInsert: true },
    );
  }

  async mapFavouriteProduct(data, memberId) {
    const favouriteArr = await this.favouriteProductsService.findIn(
      data.map((product) => product.productCode),
      memberId,
    );
    data.map((product) =>
      favouriteArr.forEach((favouriteProduct) => {
        if (favouriteProduct.productCode === product.productCode) {
          product.isFavourite = true;
          product.favouriteId = favouriteProduct._id;
          product.memberId = memberId;
        }
      }),
    );
    return data;
  }
}
