"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_user_service_1 = require("./auth.user.service");
const auth_user_controller_1 = require("./auth.user.controller");
const users_module_1 = require("../users/users.module");
const jwt_1 = require("@nestjs/jwt");
const auth_admin_service_1 = require("./auth.admin.service");
const auth_admin_controller_1 = require("./auth.admin.controller");
const jwt_strategy_1 = require("./strategies/jwt-strategy");
const role_guard_1 = require("../../common/guards/role.guard");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: () => ({
                    secret: process.env.JWT_SECRET_KEY,
                    signOptions: {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    },
                }),
            }),
        ],
        controllers: [auth_user_controller_1.AuthUserController, auth_admin_controller_1.AdminUserController],
        exports: [auth_user_service_1.AuthUserService],
        providers: [auth_user_service_1.AuthUserService, auth_admin_service_1.AuthAdminService, jwt_strategy_1.JwtStrategy, role_guard_1.RolesGuard],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map