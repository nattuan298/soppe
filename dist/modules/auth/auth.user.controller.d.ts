import { AuthUserService } from './auth.user.service';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { UserSignUpDto } from './dto/user-sign-up.dto';
export declare class AuthUserController {
    private readonly authUserService;
    constructor(authUserService: AuthUserService);
    userSignUp(userSignUpDto: UserSignUpDto): Promise<{
        message: string;
    }>;
    userSignIn(userSignInDto: UserSignInDto): Promise<{
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
