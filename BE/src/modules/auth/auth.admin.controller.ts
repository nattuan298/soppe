import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthAdminService } from './auth.admin.service';
import { AdminSignInDto } from './dto/admin-sign-in-dto';
import { AdminSignUpDto } from './dto/admin-sign-up.dto';

@ApiTags('Auth')
@Controller('admin')
export class AdminUserController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post('/signin')
  userSignIn(@Body() adminSignInDto: AdminSignInDto) {
    return this.authAdminService.adminSingIn(adminSignInDto);
  }

  @Post('/signup')
  userSignUp(@Body() adminSignUpDto: AdminSignUpDto) {
    return this.authAdminService.adminSignUp(adminSignUpDto);
  }
}
