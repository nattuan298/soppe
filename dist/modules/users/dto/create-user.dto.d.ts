import { Gender } from 'src/common/common.constants';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    generation: string;
    gender: Gender;
    dateOfBirth: Date;
}
