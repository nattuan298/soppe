import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from '../products/products.service';
import { CreateFavouriteProductDto } from './dto/create-favourite-product.dto';
import { IFavouriteProductDoc } from './favourite-products.interface';
import { FAVOURITE_PRODUCT_MODEL } from './favourite-products.schema';

@Injectable()
export class FavouriteProductsService {
  constructor(
    @InjectModel(FAVOURITE_PRODUCT_MODEL)
    private readonly favouriteProductModel: Model<IFavouriteProductDoc>,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}

  async create(
    createFavouriteProductDto: CreateFavouriteProductDto,
    userId: string,
  ) {
    createFavouriteProductDto.productId =
      createFavouriteProductDto.productId.trim();
    const countFavouriteProduct =
      await this.favouriteProductModel.countDocuments({ userId });
    if (countFavouriteProduct >= 30) {
      throw new BadRequestException(`You can only add maximum 30 product`);
    }
    const existProductId = await this.favouriteProductModel.findOne({
      productId: createFavouriteProductDto.productId,
      userId,
    });
    if (existProductId) {
      throw new ConflictException(`You already added this product`);
    }
    return await this.favouriteProductModel.create({
      ...createFavouriteProductDto,
      userId,
    });
  }

  async findAll(userId: string) {
    const favProducts = await this.favouriteProductModel
      .find({ userId })
      .lean();

    if (!favProducts.length) {
      return {
        data: [],
      };
    }
    const listProduct = await Promise.all(
      favProducts.map(async (p) => {
        const id = p.productId;
        const prod = await this.productsService.findOne(id);
        return {
          ...p,
          mediaUrl: prod.mediaUrl,
          productName: prod.productName,
        };
      }),
    );
    return {
      data: listProduct,
    };
  }

  async remove(id: string) {
    const favouriteProduct = await this.favouriteProductModel.findByIdAndDelete(
      { _id: id },
    );
    if (!favouriteProduct) {
      throw new NotFoundException(`Not found favorite product.`);
    }
  }
}
