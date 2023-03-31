import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AdminSignInDto } from './dto/admin-sign-in-dto';
import { AdminSignUpDto } from './dto/admin-sign-up.dto';
export declare class AuthAdminService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    adminSignUp(adminSignUpDto: AdminSignUpDto): Promise<void>;
    adminSingIn(adminSignInDto: AdminSignInDto): Promise<{
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
