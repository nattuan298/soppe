import { CommonIdParams } from 'src/common/common.dto';
import IJwtPayload from '../auth/payloads/jwt-payload';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RecoveryPassword, UpdatePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    sendForgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    findOne(payload: IJwtPayload): Promise<any>;
    recoveryPassword(recoveryPassword: RecoveryPassword): Promise<{
        message: string;
    }>;
    changePassword(commonIdParams: CommonIdParams, updatedPasswordAt: Date, updatePasswordDto: UpdatePasswordDto): Promise<void>;
    update(commonIdParams: CommonIdParams, updateUserDto: UpdateUserDto): void;
}
