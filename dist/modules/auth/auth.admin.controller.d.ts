import { AuthAdminService } from './auth.admin.service';
import { AdminSignInDto } from './dto/admin-sign-in-dto';
import { AdminSignUpDto } from './dto/admin-sign-up.dto';
export declare class AdminUserController {
    private readonly authAdminService;
    constructor(authAdminService: AuthAdminService);
    userSignIn(adminSignInDto: AdminSignInDto): Promise<{
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
    userSignUp(adminSignUpDto: AdminSignUpDto): Promise<void>;
}
