"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const common_1 = require("@nestjs/common");
const common_constants_1 = require("../../common/common.constants");
const users_service_1 = require("../users/users.service");
const auth_constant_1 = require("./auth.constant");
const jwt_1 = require("@nestjs/jwt");
let AuthUserService = class AuthUserService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async userSignUp(userSignUpDto) {
        return await this.usersService.userSignUp(userSignUpDto);
    }
    async userSingIn(userSignInDto) {
        let { username, password } = userSignInDto;
        username = username.trim().toLowerCase();
        password = password.trim();
        const user = await this.usersService.getUserByUsername(username);
        if (user) {
            if (user.createRequest === common_constants_1.CreateRequest.Wait) {
                throw new common_1.BadRequestException(auth_constant_1.UserSignInResponseMessage.Waiting);
            }
            if (user.createRequest === common_constants_1.CreateRequest.Reject) {
                throw new common_1.BadRequestException(auth_constant_1.UserSignInResponseMessage.Reject);
            }
            if (user.createRequest === common_constants_1.CreateRequest.Approve) {
                const checkPassword = await this.usersService.validatePassword(password, user.password);
                if (checkPassword) {
                    const payload = {
                        email: user.email,
                        username: user.username,
                        role: user.role,
                        salt: user.salt,
                        updatedPasswordAt: user.updatedPasswordAt,
                    };
                    const jwtAccessToken = await this.jwtService.signAsync(payload);
                    const { _id, firstName, lastName, email, username, updatedPasswordAt, } = user;
                    return {
                        jwtAccessToken,
                        user: {
                            _id,
                            firstName,
                            lastName,
                            username,
                            email,
                            updatedPasswordAt,
                        },
                    };
                }
            }
        }
        throw new common_1.BadRequestException(auth_constant_1.UserSignInResponseMessage.Invalid_Credentials);
    }
};
AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthUserService);
exports.AuthUserService = AuthUserService;
//# sourceMappingURL=auth.user.service.js.map