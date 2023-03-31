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
exports.RecoveryPassword = exports.SendVerifyCode = exports.VerifyEmail = exports.UpdatePasswordDto = exports.UpdateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_constants_1 = require("../../../common/common.constants");
class UpdateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, phoneNumber: { required: true, type: () => String }, generation: { required: true, type: () => String }, gender: { required: true, enum: require("../../../common/common.constants").Gender }, dateOfBirth: { required: true, type: () => Date }, avatar: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "generation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(common_constants_1.Gender),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateUserDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "avatar", void 0);
exports.UpdateUserDto = UpdateUserDto;
class UpdatePasswordDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { password: { required: true, type: () => String }, newPassword: { required: true, type: () => String, minLength: 8 } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsAlphanumeric)(),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPassword", void 0);
exports.UpdatePasswordDto = UpdatePasswordDto;
class VerifyEmail {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, code: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyEmail.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyEmail.prototype, "code", void 0);
exports.VerifyEmail = VerifyEmail;
class SendVerifyCode {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendVerifyCode.prototype, "username", void 0);
exports.SendVerifyCode = SendVerifyCode;
class RecoveryPassword {
    static _OPENAPI_METADATA_FACTORY() {
        return { code: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8 } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecoveryPassword.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsAlphanumeric)(),
    __metadata("design:type", String)
], RecoveryPassword.prototype, "password", void 0);
exports.RecoveryPassword = RecoveryPassword;
//# sourceMappingURL=update-user.dto.js.map