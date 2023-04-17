import { Module } from '@nestjs/common';
import { AuthUserService } from './auth.user.service';
import { AuthUserController } from './auth.user.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthAdminService } from './auth.admin.service';
import { AdminUserController } from './auth.admin.controller';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RolesGuard } from './../../common/guards/role.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      }),
    }),
  ],
  controllers: [AuthUserController, AdminUserController],
  exports: [AuthUserService],
  providers: [AuthUserService, AuthAdminService, JwtStrategy, RolesGuard],
})
export class AuthModule {}
