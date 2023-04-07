import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import IJwtPayload from '../auth/payloads/jwt-payload';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { CommonPaginationDto } from 'src/common/pagination.dto';
import { CommonIdParams } from 'src/common/common.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() payload: IJwtPayload,
  ) {
    return this.ordersService.create(createOrderDto, payload.id);
  }

  @Get()
  findAll(
    @GetUser() payload: IJwtPayload,
    @Query() commonPaginationDto: CommonPaginationDto,
  ) {
    return this.ordersService.findAll(commonPaginationDto, payload.id);
  }

  @Get(':id')
  findOne(@Param() commonIdParams: CommonIdParams) {
    return this.ordersService.findOne(commonIdParams.id);
  }

  @Patch('mark-received/:id')
  markReceived(@Param() commonIdParams: CommonIdParams) {
    return this.ordersService.markReceived(commonIdParams.id);
  }
}
