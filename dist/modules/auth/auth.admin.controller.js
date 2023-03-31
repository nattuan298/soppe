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
exports.AdminUserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_admin_service_1 = require("./auth.admin.service");
const admin_sign_in_dto_1 = require("./dto/admin-sign-in-dto");
const admin_sign_up_dto_1 = require("./dto/admin-sign-up.dto");
let AdminUserController = class AdminUserController {
    constructor(authAdminService) {
        this.authAdminService = authAdminService;
    }
    userSignIn(adminSignInDto) {
        return this.authAdminService.adminSingIn(adminSignInDto);
    }
    userSignUp(adminSignUpDto) {
        return this.authAdminService.adminSignUp(adminSignUpDto);
    }
};
__decorate([
    (0, common_1.Post)('/signin'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_sign_in_dto_1.AdminSignInDto]),
    __metadata("design:returntype", void 0)
], AdminUserController.prototype, "userSignIn", null);
__decorate([
    (0, common_1.Post)('/signup'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_sign_up_dto_1.AdminSignUpDto]),
    __metadata("design:returntype", void 0)
], AdminUserController.prototype, "userSignUp", null);
AdminUserController = __decorate([
    (0, swagger_1.ApiTags)('auth/admin'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [auth_admin_service_1.AuthAdminService])
], AdminUserController);
exports.AdminUserController = AdminUserController;
//# sourceMappingURL=auth.admin.controller.js.map