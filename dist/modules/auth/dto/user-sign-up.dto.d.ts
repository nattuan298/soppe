import { Gender } from 'src/common/common.constants';
export declare class UserSignUpDto {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    avatar: string;
    generation: string;
    gender: Gender;
    dateOfBirth: Date;
}
