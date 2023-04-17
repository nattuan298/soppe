import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/common.constants';
import { CommonIdParams } from 'src/common/common.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AdminFindUserDto } from './dto/find-user.dto';
import { UsersService } from './users.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import IJwtPayload from '../auth/payloads/jwt-payload';

@ApiTags('Users')
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(JwtGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@GetUser() { id }: IJwtPayload) {
    return this.usersService.findById(id);
  }

  @Get('list')
  findAllAdmin(@Query() findUserDto: AdminFindUserDto) {
    return this.usersService.adminListAll(findUserDto);
  }

  @Get('users')
  findAllUser(@Query() findUserDto: AdminFindUserDto) {
    return this.usersService.adminFindAllUser(findUserDto);
  }

  @Get('user/:id')
  findOne(@Param() commonIdParams: CommonIdParams) {
    return this.usersService.findById(commonIdParams.id);
  }

  @Delete('user/:id')
  delete(@Param() commonIdParams: CommonIdParams) {
    return this.usersService.delete(commonIdParams.id);
  }
}
