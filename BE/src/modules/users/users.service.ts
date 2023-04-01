import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import {
  RecoveryPassword,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto/update-user.dto';
import { UserDocument } from './users.interface';
import { USER_MODEL } from './users.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { PaginateModel } from 'mongoose-paginate-v2';
import * as bcrypt from 'bcrypt';
import { paginationTransformer } from 'src/common/helpers';
import { defaultAvatar, UserResponseMessage } from './user.constant';
import { Role, Status } from 'src/common/common.constants';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminFindUserDto } from './dto/find-user.dto';
import IJwtPayload from '../auth/payloads/jwt-payload';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL)
    private readonly userModel: PaginateModel<UserDocument>,
    private readonly mailerService: MailerService,
    private readonly uploadService: UploadService,
  ) {}

  async userSignUp(createUserDto: CreateUserDto) {
    createUserDto.username = createUserDto.username.trim().toLowerCase();
    createUserDto.email = createUserDto.email.trim().toLowerCase();

    const regexUsername = new RegExp(`^${createUserDto.username}$`);
    const regexEmail = new RegExp(`^${createUserDto.email}$`);

    const existingUser = await this.userModel.findOne({
      $or: [
        { username: { $regex: regexUsername, $options: 'i' } },
        { email: { $regex: regexEmail, $options: 'i' } },
      ],
    });

    if (existingUser) {
      throw new ConflictException(UserResponseMessage.AlreadyExist);
    }
    const user = new this.userModel(createUserDto);
    const { salt, hashPassword } = await this.hashPassword(
      createUserDto.password,
    );
    user.salt = salt;
    user.password = hashPassword;
    user.updatedPasswordAt = Date.now();
    user.code = '';

    const options = {
      subject: 'Welcome to Soppe',
      template: 'user-create',
      context: {
        username: createUserDto.username,
        password: createUserDto.password,
      },
    };

    await Promise.all([
      user.save(),
      this.sendMailToUser(createUserDto.email, options),
    ]);
    return {
      message: `Thanks for signing up.`,
    };
  }

  async adminSignUp(createAdminDto: CreateAdminDto) {
    createAdminDto.username = createAdminDto.username.trim().toLowerCase();
    createAdminDto.email = createAdminDto.email.trim().toLowerCase();

    const regexUsername = new RegExp(`^${createAdminDto.username}$`);
    const regexEmail = new RegExp(`^${createAdminDto.email}$`);

    const existingUser = await this.userModel.findOne({
      $or: [
        { username: { $regex: regexUsername, $options: 'i' } },
        { email: { $regex: regexEmail, $options: 'i' } },
      ],
    });
    if (existingUser) {
      throw new ConflictException(UserResponseMessage.AlreadyExist);
    }
    const user = new this.userModel(createAdminDto);
    const { salt, hashPassword } = await this.hashPassword(
      createAdminDto.password,
    );
    user.salt = salt;
    user.password = hashPassword;
    user.role = Role.Admin;
    user.status = Status.Active;
    user.updatedPasswordAt = Date.now();
    await user.save();
  }

  async findOne(payload: IJwtPayload) {
    const user = await this.userModel.findOne({
      username: payload.username,
      email: payload.email,
    });
    if (!user) {
      throw new NotFoundException(UserResponseMessage.NotFound);
    }
    if (user.avatar.length >= 1) {
      user.avatar = this.uploadService.getSignedUrl(user.avatar);
    }
    return user;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(UserResponseMessage.NotFound);
    }
    if (user.avatar) {
      user.avatar = this.uploadService.getSignedUrl(user.avatar);
    }
    return user;
  }

  async adminFindAllUser(findUserDto: AdminFindUserDto) {
    const filters: Record<string, unknown> = {};
    const options: Record<string, unknown> = {};
    options.page = findUserDto.page;
    options.limit = findUserDto.pageSize;
    options.sort = { createdAt: -1 };
    filters.role = Role.User;
    if (findUserDto.status) {
      filters.status = findUserDto.status;
    }
    if (findUserDto.keyword) {
      filters.username = { $regex: '.*' + findUserDto.keyword.trim() + '.*' };
    }

    if (findUserDto.startDate && findUserDto.endDate) {
      filters.dateOfBirth = {
        $gte: findUserDto.startDate,
        $lt: findUserDto.endDate,
      };
    }
    const users = await this.userModel.paginate(filters, options);
    users.docs.map((user: any) => {
      if (user.avatar) {
        user.avatar = this.uploadService.getSignedUrl(user.avatar);
      }
    });
    return paginationTransformer(users);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(UserResponseMessage.NotFound);
    }
    if (updateUserDto.avatar) {
      if (
        updateUserDto.avatar !== user.avatar &&
        user.avatart !== defaultAvatar
      ) {
        await this.uploadService.deletePublicFile(user.avatar);
      }
    }
    await this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  async changePassword(
    id: string,
    updatedPasswordAt: Date,
    updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(UserResponseMessage.NotFound);
    }
    updatedPasswordAt = new Date(updatedPasswordAt);
    if (user.updatedPasswordAt.getTime() !== updatedPasswordAt.getTime()) {
      throw new BadRequestException(UserResponseMessage.CanNotChangePassword);
    }
    const validatePassword = await this.validatePassword(
      updatePasswordDto.password,
      user.password,
    );
    if (!validatePassword) {
      throw new BadRequestException(UserResponseMessage.InvalidPassword);
    }
    const { salt, hashPassword } = await this.hashPassword(
      updatePasswordDto.newPassword,
    );
    user.salt = salt;
    user.password = hashPassword;
    user.updatedPasswordAt = Date.now();
    await user.save();
  }

  async delete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(UserResponseMessage.NotFound);
    }
  }

  // async sendVerifyCode(sendVerifyCode: SendVerifyCode) {
  //   const user = await this.userModel.findOne({
  //     username: sendVerifyCode.username,
  //   });
  //   if (!user) {
  //     throw new NotFoundException(UserResponseMessage.NotFound);
  //   }
  //   if (user.status === Status.Active) {
  //     throw new BadRequestException(UserResponseMessage.Verified);
  //   }
  //   const code = Math.floor(Math.random() * Math.pow(10, 6)).toString();
  //   user.code = code;

  //   await user.save();

  //   const options = {
  //     subject: 'Verify Code',
  //     template: 'send-verify-code',
  //     context: {
  //       code: code,
  //     },
  //   };
  //   await this.sendMailToUser(user.email, options);
  //   return {
  //     message: `Send reset code successful.`,
  //   };
  // }

  // async verifyAccount(verifyEmail: VerifyEmail) {
  //   const user = await this.userModel.findOne({
  //     username: verifyEmail.username,
  //     code: verifyEmail.code,
  //   });
  //   if (!user) {
  //     throw new NotFoundException(UserResponseMessage.NotFound);
  //   }
  //   user.status = Status.Active;
  //   user.code = '';
  //   await user.save();

  //   return { message: `${UserResponseMessage.VerifyEmailSuccess}` };
  // }

  async sendForgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userModel.findOne({
      username: forgotPasswordDto.username,
      email: forgotPasswordDto.email,
    });
    if (!user) {
      throw new NotFoundException(UserResponseMessage.NotFound);
    }
    const code = Math.floor(Math.random() * Math.pow(10, 6)).toString();
    user.code = code;

    const options = {
      subject: 'Forgot Password!',
      template: 'send-otp-code',
      context: {
        code,
      },
    };
    await Promise.all([
      user.save(),
      this.sendMailToUser(forgotPasswordDto.email, options),
    ]);
    return {
      message: `Send reset code successful.`,
    };
  }

  async recoveryPass(recoveryPassword: RecoveryPassword) {
    const user = await this.userModel.findOne({ code: recoveryPassword.code });
    if (!user) {
      throw new NotFoundException(UserResponseMessage.NotFound);
    }
    const { salt, hashPassword } = await this.hashPassword(
      recoveryPassword.newPassword,
    );
    user.salt = salt;
    user.password = hashPassword;
    user.updatedPasswordAt = Date.now();
    user.code = '';
    await user.save();
    return {
      message: `Recovery password successful.`,
    };
  }

  async getUserByUsername(username: string): Promise<any> {
    return this.userModel.findOne({ username });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return {
      salt,
      hashPassword,
    };
  }

  async validatePassword(
    password: string,
    currentPassword: string,
  ): Promise<boolean> {
    const hashPassword = await bcrypt.compare(password, currentPassword);
    return hashPassword;
  }

  async validateUser(email: string, username: string): Promise<any> {
    return this.userModel.findOne({ email, username });
  }

  async sendMailToUser(email: string, options): Promise<any> {
    return this.mailerService
      .sendMail({
        to: email,
        from: process.env.MAIL_USERNAME,
        subject: options.subject,
        template: `./${options.template}`,
        context: options.context,
      })
      .then((res) => {
        console.log('Send mail success to user');
      })
      .catch((err) => {
        console.log('Error while sending mail to carrier', err);
      });
  }
}
