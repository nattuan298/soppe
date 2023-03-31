import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  UseGuards,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommonIdParams } from 'src/common/common.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import IJwtPayload from '../auth/payloads/jwt-payload';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import {
  RecoveryPassword,
  SendVerifyCode,
  UpdatePasswordDto,
  UpdateUserDto,
  VerifyEmail,
} from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('forgot-password')
  sendForgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.usersService.sendForgotPassword(forgotPasswordDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('profile')
  findOne(@GetUser() payload: IJwtPayload) {
    return this.usersService.findOne(payload);
  }

  // @Put('verify')
  // verifyEmail(@Body() verifyEmail: VerifyEmail) {
  //   return this.usersService.verifyAccount(verifyEmail);
  // }

  @Put('recovery-password')
  recoveryPassword(@Body() recoveryPassword: RecoveryPassword) {
    return this.usersService.recoveryPass(recoveryPassword);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Put('change-password/:id')
  changePassword(
    @Param() commonIdParams: CommonIdParams,
    @GetUser('updatedPasswordAt') updatedPasswordAt: Date,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.changePassword(
      commonIdParams.id,
      updatedPasswordAt,
      updatePasswordDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Param() commonIdParams: CommonIdParams,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.usersService.update(commonIdParams.id, updateUserDto);
  }
}
