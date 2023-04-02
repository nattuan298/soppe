import { InjectModel } from '@nestjs/mongoose';
import { ADDRESS_MODEL } from './address.schema';
import { Model } from 'mongoose';
import { IAddressDocument } from './address.interface';
import { CreateAddressDto } from './dto/create-adrress.dto';
import { UpdateAddressDto } from './dto/update-adress.dto';
import { error } from 'console';
import { NotFoundException } from '@nestjs/common';

export class AddressService {
  constructor(
    @InjectModel(ADDRESS_MODEL)
    private readonly addressModel: Model<IAddressDocument>,
  ) {}

  async create(createAddress: CreateAddressDto, userId: string) {
    createAddress.firstName = createAddress.firstName.trim();
    createAddress.lastName = createAddress.lastName.trim();
    createAddress.address = createAddress.address.trim();
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
    updateAddressDto.address = updateAddressDto.address.trim();
    updateAddressDto.firstName = updateAddressDto.firstName.trim();
    updateAddressDto.lastName = updateAddressDto.lastName.trim();
    const address = await this.addressModel.findOne({
      _id: { $ne: id },
      address: { $options: 'i' },
      firstName: { $options: 'i' },
      lastName: { $options: 'i' },
    });
    if (address) {
      throw new NotFoundException(`Not found address.`);
    }
    const existingAddressLoop = await this.addressModel.findByIdAndUpdate(
      { _id: id },
      updateAddressDto,
      { new: true },
    );
    if (!existingAddressLoop) {
      throw new NotFoundException(`Not found address.`);
    }
  }
  async remove(id: string) {
    const addressDelete = await this.addressModel.findByIdAndDelete({
      _id: id,
    });
    if (!addressDelete) {
      throw new NotFoundException(`Not found address.`);
    }
  }
}
