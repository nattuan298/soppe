"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSignInResponseMessage = exports.UserSignInResponseMessage = void 0;
var UserSignInResponseMessage;
(function (UserSignInResponseMessage) {
    UserSignInResponseMessage["Waiting"] = "Your account needs admin approval.";
    UserSignInResponseMessage["Reject"] = "Your account has been rejected.\nContact admin with any questions.";
    UserSignInResponseMessage["Verify"] = "You need to verify your email. Verification code has been sent with welcome email.";
    UserSignInResponseMessage["Invalid_Credentials"] = "Invalid credentials";
})(UserSignInResponseMessage = exports.UserSignInResponseMessage || (exports.UserSignInResponseMessage = {}));
var AdminSignInResponseMessage;
(function (AdminSignInResponseMessage) {
    AdminSignInResponseMessage["Invalid_Credentials"] = "Invalid credentials";
})(AdminSignInResponseMessage = exports.AdminSignInResponseMessage || (exports.AdminSignInResponseMessage = {}));
//# sourceMappingURL=auth.constant.js.map