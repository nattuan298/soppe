"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAvatar = exports.UserResponseMessage = void 0;
var UserResponseMessage;
(function (UserResponseMessage) {
    UserResponseMessage["AlreadyExist"] = "Username or Email already existed.";
    UserResponseMessage["NotFound"] = "User is not found.";
    UserResponseMessage["InvalidPassword"] = "Invalid password.";
    UserResponseMessage["CanNotChangePassword"] = "You cannot change password.";
    UserResponseMessage["VerifyEmailFail"] = "Cannot verify your account. Please try to verify again.";
    UserResponseMessage["VerifyEmailSuccess"] = "Successfully verified.";
    UserResponseMessage["Verified"] = "Your account has been verified";
})(UserResponseMessage = exports.UserResponseMessage || (exports.UserResponseMessage = {}));
exports.defaultAvatar = `user/d0e2c90f-943b-4bb2-a26a-8ca50a475031-default-avatar.jpg`;
//# sourceMappingURL=user.constant.js.map