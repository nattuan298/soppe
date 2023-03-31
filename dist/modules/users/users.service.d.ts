import { CreateUserDto } from './dto/create-user.dto';
import { RecoveryPassword, UpdatePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './users.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { PaginateModel } from 'mongoose-paginate-v2';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateRequestDto } from './dto/update-request.dto';
import { AdminFindUserDto } from './dto/find-user.dto';
import IJwtPayload from '../auth/payloads/jwt-payload';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UploadService } from '../upload/upload.service';
export declare class UsersService {
    private readonly userModel;
    private readonly mailerService;
    private readonly uploadService;
    constructor(userModel: PaginateModel<UserDocument>, mailerService: MailerService, uploadService: UploadService);
    userSignUp(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    adminSignUp(createAdminDto: CreateAdminDto): Promise<void>;
    findOne(payload: IJwtPayload): Promise<any>;
    findById(id: string): Promise<any>;
    adminFindAllUser(findUserDto: AdminFindUserDto): Promise<import("../../common/common.interface").IPaginationData<any>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<void>;
    changePassword(id: string, updatedPasswordAt: Date, updatePasswordDto: UpdatePasswordDto): Promise<void>;
    delete(id: string): Promise<void>;
    sendForgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    recoveryPass(recoveryPassword: RecoveryPassword): Promise<{
        message: string;
    }>;
    updateCreateRequest(id: string, createRequestDto: CreateRequestDto): Promise<void>;
    getUserByUsername(username: string): Promise<any>;
    hashPassword(password: string): Promise<{
        salt: string;
        hashPassword: string;
    }>;
    validatePassword(password: string, currentPassword: string): Promise<boolean>;
    validateUser(email: string, username: string): Promise<any>;
    sendMailToUser(email: string, options: any): Promise<any>;
}
