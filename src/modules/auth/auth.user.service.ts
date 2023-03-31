import { BadRequestException, Injectable } from '@nestjs/common';
import { Status } from 'src/common/common.constants';
import { UsersService } from '../users/users.service';
import { UserSignInResponseMessage } from './auth.constant';
import { JwtService } from '@nestjs/jwt';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import IJwtPayload from './payloads/jwt-payload';
@Injectable()
export class AuthUserService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async userSignUp(userSignUpDto: UserSignUpDto) {
    return await this.usersService.userSignUp(userSignUpDto);
  }

  async userSingIn(userSignInDto: UserSignInDto) {
    let { username, password } = userSignInDto;
    username = username.trim().toLowerCase();
    password = password.trim();
    const user = await this.usersService.getUserByUsername(username);
    if (user) {
      const checkPassword = await this.usersService.validatePassword(
        password,
        user.password,
      );
      if (checkPassword) {
        const payload: IJwtPayload = {
          email: user.email,
          username: user.username,
          role: user.role,
          salt: user.salt,
          updatedPasswordAt: user.updatedPasswordAt,
        };
        const jwtAccessToken = await this.jwtService.signAsync(payload);
        const { _id, firstName, lastName, email, username, updatedPasswordAt } =
          user;
        return {
          jwtAccessToken,
          user: {
            _id,
            firstName,
            lastName,
            username,
            email,
            updatedPasswordAt,
          },
        };
      }
    }
    throw new BadRequestException(
      UserSignInResponseMessage.Invalid_Credentials,
    );
  }
}
