import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { UserSignUpDto } from './dto/user-sign-up.dto';
export declare class AuthUserService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    userSignUp(userSignUpDto: UserSignUpDto): Promise<{
        message: string;
    }>;
    userSingIn(userSignInDto: UserSignInDto): Promise<{
        jwtAccessToken: string;
        user: {
            _id: any;
            firstName: any;
            lastName: any;
            username: any;
            email: any;
            updatedPasswordAt: any;
        };
    }>;
}
