import { InjectModel } from '@nestjs/mongoose';
import { ADDRESS_MODEL } from './address.schema';
import { Model } from 'mongoose';
import { IAddressDocument } from './address.interface';
import { CreateAddressDto } from './dto/create-address.dto';

import { NotFoundException } from '@nestjs/common';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressResponseMessage } from './address.constant';

export class AddressService {
  constructor(
    @InjectModel(ADDRESS_MODEL)
    private readonly addressModel: Model<IAddressDocument>,
  ) {}

  async create(createAddress: CreateAddressDto, userId: string) {
    createAddress.firstName = createAddress.firstName.trim();
    createAddress.lastName = createAddress.lastName.trim();
    createAddress.addressDetail = createAddress.addressDetail.trim();
    return await this.addressModel.create({
      ...createAddress,
      userId,
    });
  }

  async findAll(userId: string) {
    const address = await this.addressModel.find({ userId }).lean();
    if (!address.length) {
      return {
        data: [],
      };
    }
    return {
      data: address,
    };
  }
  async findOne(id: string) {
    const address = await this.addressModel.findById(id);
    if (!address) {
      return;
    }
    return address;
  }
  async update(id: string, updateAddressDto: UpdateAddressDto) {
    updateAddressDto.addressDetail = updateAddressDto.addressDetail.trim();
    updateAddressDto.firstName = updateAddressDto.firstName.trim();
    updateAddressDto.lastName = updateAddressDto.lastName.trim();
    const existingAddressLoop = await this.addressModel.findByIdAndUpdate(
      { _id: id },
      updateAddressDto,
      { new: true },
    );
    if (!existingAddressLoop) {
      throw new NotFoundException(AddressResponseMessage.NotFound);
    }
  }
  async remove(id: string) {
    const addressDelete = await this.addressModel.findByIdAndDelete({
      _id: id,
    });
    if (!addressDelete) {
      throw new NotFoundException(AddressResponseMessage.NotFound);
    }
  }

  concatAddress(
    addressDetail: string,
    subDistrict: string,
    district: string,
    province: string,
  ) {
    return addressDetail + subDistrict + district + province;
  }
}
