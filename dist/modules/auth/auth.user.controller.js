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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_user_service_1 = require("./auth.user.service");
const user_sign_in_dto_1 = require("./dto/user-sign-in.dto");
const user_sign_up_dto_1 = require("./dto/user-sign-up.dto");
let AuthUserController = class AuthUserController {
    constructor(authUserService) {
        this.authUserService = authUserService;
    }
    userSignUp(userSignUpDto) {
        return this.authUserService.userSignUp(userSignUpDto);
    }
    userSignIn(userSignInDto) {
        return this.authUserService.userSingIn(userSignInDto);
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_sign_up_dto_1.UserSignUpDto]),
    __metadata("design:returntype", void 0)
], AuthUserController.prototype, "userSignUp", null);
__decorate([
    (0, common_1.Post)('/signin'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_sign_in_dto_1.UserSignInDto]),
    __metadata("design:returntype", void 0)
], AuthUserController.prototype, "userSignIn", null);
AuthUserController = __decorate([
    (0, swagger_1.ApiTags)('auth/users'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_user_service_1.AuthUserService])
], AuthUserController);
exports.AuthUserController = AuthUserController;
//# sourceMappingURL=auth.user.controller.js.map