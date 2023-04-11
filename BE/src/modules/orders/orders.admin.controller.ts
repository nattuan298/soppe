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
import { GetUser } from 'src/common/decorators/get-user.decorator';
import IJwtPayload from '../auth/payloads/jwt-payload';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { CommonIdParams } from 'src/common/common.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/common.constants';
import { RolesGuard } from 'src/common/guards/role.guard';
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
