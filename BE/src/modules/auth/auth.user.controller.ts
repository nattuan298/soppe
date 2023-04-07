import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUserService } from './auth.user.service';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { UserSignUpDto } from './dto/user-sign-up.dto';

@ApiTags('Auth')
@Controller()
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('/signup')
  userSignUp(@Body() userSignUpDto: UserSignUpDto) {
    return this.authUserService.userSignUp(userSignUpDto);
  }

  @Post('/signin')
  userSignIn(@Body() userSignInDto: UserSignInDto) {
    return this.authUserService.userSingIn(userSignInDto);
  }
}
