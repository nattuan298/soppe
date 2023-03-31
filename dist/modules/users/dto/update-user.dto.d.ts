import { Gender } from 'src/common/common.constants';
export declare class UpdateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    generation: string;
    gender: Gender;
    dateOfBirth: Date;
    avatar: string;
}
export declare class UpdatePasswordDto {
    password: string;
    newPassword: string;
}
export declare class VerifyEmail {
    username: string;
    code: string;
}
export declare class SendVerifyCode {
    username: string;
}
export declare class RecoveryPassword {
    code: string;
    password: string;
}
