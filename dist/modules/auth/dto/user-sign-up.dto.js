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
exports.UserSignUpDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_constants_1 = require("../../../common/common.constants");
class UserSignUpDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, username: { required: true, type: () => String, minLength: 6 }, password: { required: true, type: () => String, minLength: 8 }, email: { required: true, type: () => String }, phoneNumber: { required: true, type: () => String }, avatar: { required: true, type: () => String }, generation: { required: true, type: () => String }, gender: { required: true, enum: require("../../../common/common.constants").Gender }, dateOfBirth: { required: true, type: () => Date } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsAlphanumeric)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'avatar/avatar1.png' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "generation", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(common_constants_1.Gender),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UserSignUpDto.prototype, "dateOfBirth", void 0);
exports.UserSignUpDto = UserSignUpDto;
//# sourceMappingURL=user-sign-up.dto.js.map