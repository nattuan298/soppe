import {
  Body,
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-adrress.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import IJwtPayload from '../auth/payloads/jwt-payload';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { CommonIdParams } from 'src/common/common.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('address')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(
    @Body() createAddressDto: CreateAddressDto,
    @GetUser() { id }: IJwtPayload,
  ) {
    return this.addressService.create(createAddressDto, id);
  }

  @Get()
  findAll(@GetUser() { id }: IJwtPayload) {
    return this.addressService.findAll(id);
  }

  @Get(':id')
  findOne(@Param() commonIdParams: CommonIdParams) {
    return this.addressService.findOne(commonIdParams.id);
  }

  @Put(':id')
  update(
    @Param() commonIdParams: CommonIdParams,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    this.addressService.update(commonIdParams.id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param() { id }: CommonIdParams) {
    return this.addressService.remove(id);
  }
}
