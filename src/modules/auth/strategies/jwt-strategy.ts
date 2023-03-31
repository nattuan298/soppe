import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import IJwtPayload from '../payloads/jwt-payload';
import { UsersService } from '../../users/users.service';
import { Status } from '../../../common/common.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    const { email, username, salt } = payload;
    const user = await this.usersService.validateUser(email, username);
    if (!user) {
      throw new UnauthorizedException('Invalid Token');
    }
    if (user.status !== Status.Active && user.salt !== salt) {
      throw new UnauthorizedException('Session Expired');
    }
    return payload;
  }
}
