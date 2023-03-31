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
exports.AdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_constants_1 = require("../../common/common.constants");
const common_dto_1 = require("../../common/common.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const jwt_guard_1 = require("../../common/guards/jwt-guard");
const role_guard_1 = require("../../common/guards/role.guard");
const find_user_dto_1 = require("./dto/find-user.dto");
const update_request_dto_1 = require("./dto/update-request.dto");
const users_service_1 = require("./users.service");
let AdminController = class AdminController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAllUser(findUserDto) {
        return this.usersService.adminFindAllUser(findUserDto);
    }
    findOne(commonIdParams) {
        return this.usersService.findById(commonIdParams.id);
    }
    updateRequest(commonIdParams, createRequestDto) {
        return this.usersService.updateCreateRequest(commonIdParams.id, createRequestDto);
    }
    delete(commonIdParams) {
        return this.usersService.delete(commonIdParams.id);
    }
};
__decorate([
    (0, common_1.Get)('users'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_dto_1.AdminFindUserDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllUser", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.CommonIdParams]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('user-request/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.CommonIdParams,
        update_request_dto_1.CreateRequestDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateRequest", null);
__decorate([
    (0, common_1.Delete)('user/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.CommonIdParams]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "delete", null);
AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(common_constants_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map