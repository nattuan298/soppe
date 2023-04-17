import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from './../../common/decorators/get-user.decorator';
import IJwtPayload from '../auth/payloads/jwt-payload';
import { JwtGuard } from './../../common/guards/jwt-guard';
import { CommonIdParams } from './../../common/common.dto';
import { Roles } from './../../common/decorators/roles.decorator';
import { Role } from './../../common/common.constants';
import { RolesGuard } from './../../common/guards/role.guard';
import { FindOrderDto } from './dto/find-order.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(JwtGuard, RolesGuard)
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Query() findOrderDto: FindOrderDto) {
    return this.ordersService.findAll(findOrderDto);
  }

  @Patch('mark-approved/:id')
  markReceived(
    @Param() commonIdParams: CommonIdParams,
    @GetUser() payload: IJwtPayload,
  ) {
    return this.ordersService.adminApproveOrder(commonIdParams.id, payload.id);
  }
}
