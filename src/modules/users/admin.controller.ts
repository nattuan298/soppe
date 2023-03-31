import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  SetMetadata,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/common.constants';
import { CommonIdParams } from 'src/common/common.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AdminFindUserDto } from './dto/find-user.dto';
import { CreateRequestDto } from './dto/update-request.dto';
import { UsersService } from './users.service';

@ApiTags('admin')
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(JwtGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

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
