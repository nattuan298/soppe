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
exports.AdminFindUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_constants_1 = require("../../../common/common.constants");
const pagination_dto_1 = require("../../../common/pagination.dto");
class AdminFindUserDto extends pagination_dto_1.CommonPaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, enum: require("../../../common/common.constants").Status }, startDate: { required: false, type: () => Date }, endDate: { required: false, type: () => Date }, keyword: { required: false, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(common_constants_1.Status),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminFindUserDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2021-07-24T10:15:26.658Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], AdminFindUserDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-07-24T10:15:26.658Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], AdminFindUserDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminFindUserDto.prototype, "keyword", void 0);
exports.AdminFindUserDto = AdminFindUserDto;
//# sourceMappingURL=find-user.dto.js.map