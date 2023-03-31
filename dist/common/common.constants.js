"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.Gender = exports.Status = exports.BearerType = void 0;
exports.BearerType = 'Bearer';
var Status;
(function (Status) {
    Status["Active"] = "Active";
    Status["InActive"] = "Inactive";
})(Status = exports.Status || (exports.Status = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Other";
})(Gender = exports.Gender || (exports.Gender = {}));
var Role;
(function (Role) {
    Role["Admin"] = "Admin";
    Role["User"] = "User";
})(Role = exports.Role || (exports.Role = {}));
//# sourceMappingURL=common.constants.js.map