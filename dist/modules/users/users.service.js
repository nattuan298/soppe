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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./users.schema");
const mailer_1 = require("@nestjs-modules/mailer");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
const bcrypt = require("bcrypt");
const helpers_1 = require("../../common/helpers");
const user_constant_1 = require("./user.constant");
const common_constants_1 = require("../../common/common.constants");
const upload_service_1 = require("../upload/upload.service");
let UsersService = class UsersService {
    constructor(userModel, mailerService, uploadService) {
        this.userModel = userModel;
        this.mailerService = mailerService;
        this.uploadService = uploadService;
    }
    async userSignUp(createUserDto) {
        createUserDto.username = createUserDto.username.trim().toLowerCase();
        createUserDto.email = createUserDto.email.trim().toLowerCase();
        const regexUsername = new RegExp(`^${createUserDto.username}$`);
        const regexEmail = new RegExp(`^${createUserDto.email}$`);
        const existingUser = await this.userModel.findOne({
            $or: [
                { username: { $regex: regexUsername, $options: 'i' } },
                { email: { $regex: regexEmail, $options: 'i' } },
            ],
        });
        if (existingUser) {
            throw new common_1.ConflictException(user_constant_1.UserResponseMessage.AlreadyExist);
        }
        const user = new this.userModel(createUserDto);
        const { salt, hashPassword } = await this.hashPassword(createUserDto.password);
        user.salt = salt;
        user.password = hashPassword;
        user.updatedPasswordAt = Date.now();
        user.code = '';
        const options = {
            subject: 'Welcome to GVC Management',
            template: 'user-create',
            context: {
                username: createUserDto.username,
                password: createUserDto.password,
            },
        };
        await Promise.all([
            user.save(),
            this.sendMailToUser(createUserDto.email, options),
        ]);
        return {
            message: `Thanks for signing up. Please wait for admin to approve your account.`,
        };
    }
    async adminSignUp(createAdminDto) {
        createAdminDto.username = createAdminDto.username.trim().toLowerCase();
        createAdminDto.email = createAdminDto.email.trim().toLowerCase();
        const regexUsername = new RegExp(`^${createAdminDto.username}$`);
        const regexEmail = new RegExp(`^${createAdminDto.email}$`);
        const existingUser = await this.userModel.findOne({
            $or: [
                { username: { $regex: regexUsername, $options: 'i' } },
                { email: { $regex: regexEmail, $options: 'i' } },
            ],
        });
        if (existingUser) {
            throw new common_1.ConflictException(user_constant_1.UserResponseMessage.AlreadyExist);
        }
        const user = new this.userModel(createAdminDto);
        const { salt, hashPassword } = await this.hashPassword(createAdminDto.password);
        user.salt = salt;
        user.password = hashPassword;
        user.role = common_constants_1.Role.Admin;
        user.status = common_constants_1.Status.Active;
        user.updatedPasswordAt = Date.now();
        await user.save();
    }
    async findOne(payload) {
        const user = await this.userModel.findOne({
            username: payload.username,
            email: payload.email,
        });
        if (!user) {
            throw new common_1.NotFoundException(user_constant_1.UserResponseMessage.NotFound);
        }
        if (user.avatar.length >= 1) {
            user.avatar = this.uploadService.getSignedUrl(user.avatar);
        }
        return user;
    }
    async findById(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(user_constant_1.UserResponseMessage.NotFound);
        }
        if (user.avatar.length >= 1) {
            user.avatar = this.uploadService.getSignedUrl(user.avatar);
        }
        return user;
    }
    async adminFindAllUser(findUserDto) {
        const filters = {};
        const options = {};
        options.page = findUserDto.page;
        options.limit = findUserDto.pageSize;
        options.sort = { createdAt: -1 };
        filters.role = common_constants_1.Role.User;
        if (findUserDto.status) {
            filters.status = findUserDto.status;
        }
        if (findUserDto.keyword) {
            const keyword = new RegExp(findUserDto.keyword.trim(), 'i');
            filters.username = keyword;
        }
        if (findUserDto.startDate && findUserDto.endDate) {
            filters.dateOfBirth = {
                $gte: findUserDto.startDate,
                $lt: findUserDto.endDate,
            };
        }
        const users = await this.userModel.paginate(filters, options);
        users.docs.map((user) => {
            if (user.avatar.length >= 1) {
                user.avatar = this.uploadService.getSignedUrl(user.avatar);
            }
        });
        return (0, helpers_1.paginationTransformer)(users);
    }
    async update(id, updateUserDto) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(user_constant_1.UserResponseMessage.NotFound);
        }
        if (updateUserDto.avatar) {
            if (updateUserDto.avatar !== user.avatar &&
                user.avatart !== user_constant_1.defaultAvatar) {
                await this.uploadService.deletePublicFile(user.avatar);
            }
        }
        await this.userModel.updateOne({ _id: id }, updateUserDto);
    }
    async changePassword(id, updatedPasswordAt, updatePasswordDto) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(user_constant_1.UserResponseMessage.NotFound);
        }
        updatedPasswordAt = new Date(updatedPasswordAt);
        if (user.updatedPasswordAt.getTime() !== updatedPasswordAt.getTime()) {
            throw new common_1.BadRequestException(user_constant_1.UserResponseMessage.CanNotChangePassword);
        }
        const validatePassword = await this.validatePassword(updatePasswordDto.password, user.password);
        if (!validatePassword) {
            throw new common_1.BadRequestException(user_constant_1.UserResponseMessage.InvalidPassword);
        }
        const { salt, hashPassword } = await this.hashPassword(updatePasswordDto.newPassword);
        user.salt = salt;
        user.password = hashPassword;
        user.updatedPasswordAt = Date.now();
        await user.save();
    }
    async delete(id) {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new common_1.NotFoundException(user_constant_1.UserResponseMessage.NotFound);
        }
    }
    async sendForgotPassword(forgotPasswordDto) {
        const user = await this.userModel.findOne({
            username: forgotPasswordDto.username,
            email: forgotPasswordDto.email,
        });
        if (!user) {
            throw new common_1.NotFoundException(user_constant_1.UserResponseMessage.NotFound);
        }
        const code = Math.floor(Math.random() * Math.pow(10, 6)).toString();
        user.code = code;
        const options = {
            subject: 'Forgot Password!',
            template: 'send-otp-code',
            context: {
                code,
            },
        };
        await Promise.all([
            user.save(),
            this.sendMailToUser(forgotPasswordDto.email, options),
        ]);
        return {
            message: `Send reset code successful.`,
        };
    }
    async recoveryPass(recoveryPassword) {
        const user = await this.userModel.findOne({ code: recoveryPassword.code });
        if (!user) {
            throw new common_1.NotFoundException(user_constant_1.UserResponseMessage.NotFound);
        }
        const { salt, hashPassword } = await this.hashPassword(recoveryPassword.password);
        user.salt = salt;
        user.password = hashPassword;
        user.updatedPasswordAt = Date.now();
        user.code = '';
        await user.save();
        return {
            message: `Recovery password successful.`,
        };
    }
    async getUserByUsername(username) {
        return this.userModel.findOne({ username });
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        return {
            salt,
            hashPassword,
        };
    }
    async validatePassword(password, currentPassword) {
        const hashPassword = await bcrypt.compare(password, currentPassword);
        return hashPassword;
    }
    async validateUser(email, username) {
        return this.userModel.findOne({ email, username });
    }
    async sendMailToUser(email, options) {
        return this.mailerService
            .sendMail({
            to: email,
            from: process.env.MAIL_USERNAME,
            subject: options.subject,
            template: `./${options.template}`,
            context: options.context,
        })
            .then((res) => {
            console.log('Send mail success to user');
        })
            .catch((err) => {
            console.log('Error while sending mail to carrier', err);
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.USER_MODEL)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_paginate_v2_1.PaginateModel !== "undefined" && mongoose_paginate_v2_1.PaginateModel) === "function" ? _a : Object, mailer_1.MailerService,
        upload_service_1.UploadService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map