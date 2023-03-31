"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_MODEL = exports.UserSchema = void 0;
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const common_constants_1 = require("../../common/common.constants");
const user_constant_1 = require("./user.constant");
const USER_MODEL = 'users';
exports.USER_MODEL = USER_MODEL;
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String,
    phoneNumber: {
        type: String,
        default: '',
    },
    generation: String,
    gender: {
        type: String,
        enum: Object.values(common_constants_1.Gender),
    },
    avatar: {
        type: String,
        default: user_constant_1.defaultAvatar,
    },
    beltLevel: {
        type: String,
        default: '',
    },
    dateOfBirth: Date,
    salt: String,
    status: {
        type: String,
        enum: Object.values(common_constants_1.Status),
        default: common_constants_1.Status.InActive,
    },
    role: {
        type: String,
        enum: Object.values(common_constants_1.Role),
        default: common_constants_1.Role.User,
    },
    createRequest: {
        type: String,
        enum: Object.values(common_constants_1.CreateRequest),
    },
    updatedPasswordAt: Date,
    code: String,
}, {
    timestamps: true,
});
exports.UserSchema = UserSchema;
UserSchema.plugin(mongoosePaginate);
//# sourceMappingURL=users.schema.js.map