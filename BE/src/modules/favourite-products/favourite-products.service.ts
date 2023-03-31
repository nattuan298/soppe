import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
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
    memberId: string,
  ) {
    createFavouriteProductDto.productCode =
      createFavouriteProductDto.productCode.trim();
    const countFavouriteProduct =
      await this.favouriteProductModel.countDocuments({ memberId });
    if (countFavouriteProduct >= 30) {
      throw new BadRequestException({
        key: 'translate.FavouriteProdOver30Products',
      });
    }
    const existProductCode = await this.favouriteProductModel.findOne({
      productCode: createFavouriteProductDto.productCode,
      memberId,
    });
    if (existProductCode) {
      throw new ConflictException({
        key: 'translate.FavouriteProdAlreadyExist',
      });
    }
    return await this.favouriteProductModel.create({
      ...createFavouriteProductDto,
      memberId,
    });
  }

  async findAll(memberId: string) {
    const favProducts = await this.favouriteProductModel.find({ memberId });
    if (!favProducts.length) {
      return {
        data: [],
      };
    }
    return {
      data: favProducts,
    };
  }

  async findIn(productCode: string[], memberId: string) {
    const favouriteProducts = await this.favouriteProductModel.find({
      productCode: { $in: productCode },
      memberId,
    });
    return favouriteProducts;
  }

  async findOne(productCode: string, memberId: string) {
    const favouriteProduct = await this.favouriteProductModel.findOne({
      productCode,
      memberId,
    });
    return favouriteProduct;
  }

  async remove(id: string) {
    const favouriteProduct = await this.favouriteProductModel.findByIdAndDelete(
      { _id: id },
    );
    if (!favouriteProduct) {
      throw new BadGatewayException({ key: 'translate.FavouriteProdNotFound' });
    }
  }
}
