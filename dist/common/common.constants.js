"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeltLevel = exports.CreateRequest = exports.Role = exports.Gender = exports.Status = exports.BearerType = void 0;
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
var CreateRequest;
(function (CreateRequest) {
    CreateRequest["Reject"] = "Reject";
    CreateRequest["Approve"] = "Approve";
    CreateRequest["Wait"] = "Wait";
})(CreateRequest = exports.CreateRequest || (exports.CreateRequest = {}));
var BeltLevel;
(function (BeltLevel) {
    BeltLevel["tuVe"] = "T\u1EF1 V\u1EC7";
    BeltLevel["nhapMon"] = "Lam \u0110ai";
    BeltLevel["lamDai1"] = "Lam \u0110ai I";
    BeltLevel["lamDai2"] = "Lam \u0110ai II";
    BeltLevel["lamDai3"] = "Lam \u0110ai III";
    BeltLevel["hoangDai"] = "Ho\u00E0ng \u0110ai";
    BeltLevel["hoangDai1"] = "Ho\u00E0ng \u0110ai I";
    BeltLevel["hoangDai2"] = "Ho\u00E0ng \u0110ai II";
    BeltLevel["hoangDai3"] = "Ho\u00E0ng \u0110ai III";
    BeltLevel["chuanHongDai"] = "Chu\u1EA9n H\u1ED3ng \u0110ai";
})(BeltLevel = exports.BeltLevel || (exports.BeltLevel = {}));
//# sourceMappingURL=common.constants.js.map