import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthAdminService } from './auth.admin.service';
import { AdminSignInDto } from './dto/admin-sign-in-dto';
import { AdminSignUpDto } from './dto/admin-sign-up.dto';
import { Roles } from './../../common/decorators/roles.decorator';
import { Role } from './../../common/common.constants';
import { JwtGuard } from './../../common/guards/jwt-guard';
import { RolesGuard } from './../../common/guards/role.guard';

@ApiTags('Auth')
@Controller('admin')
export class AdminUserController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post('/signin')
  userSignIn(@Body() adminSignInDto: AdminSignInDto) {
    return this.authAdminService.adminSingIn(adminSignInDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/create')
  userSignUp(@Body() adminSignUpDto: AdminSignUpDto) {
    return this.authAdminService.adminSignUp(adminSignUpDto);
  }
}
