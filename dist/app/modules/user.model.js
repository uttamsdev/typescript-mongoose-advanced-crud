"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required it cannot be empty'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required it cannot be empty'],
    },
});
const userAddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, 'Street is required it cannot be empty'],
    },
    city: {
        type: String,
        required: [true, 'City is required it cannot be empty'],
    },
    country: {
        type: String,
        required: [true, 'Country is required it cannot be empty'],
    },
});
const userOrderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        // required: [true, 'Product name is required it cannot be empty'],
    },
    price: {
        type: Number,
        // required: [true, 'Price is required it cannot be empty'],
    },
    quantity: {
        type: Number,
        // required: [true, 'Quantity is required it cannot be empty'],
    },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        unique: true,
        required: [true, 'userId is required it cannot be empty'],
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required it cannot be empty'],
    },
    password: {
        type: String,
        required: [true, 'password is required it cannot be empty'],
    },
    fullName: {
        type: userNameSchema,
        required: [true, 'Full name is required it cannot be empty'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required it cannot be empty'],
    },
    email: {
        type: String,
        required: [true, 'email is required it cannot be empty'],
    },
    isActive: { type: Boolean, required: true, default: true },
    hobbies: {
        type: [String],
        required: [true, 'Hobbies is required it cannot be empty'],
    },
    address: {
        type: userAddressSchema,
        required: [true, 'Address is required it cannot be empty'],
    },
    orders: { type: [userOrderSchema], required: false },
});
//model
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
userSchema.methods.toJSON = function () {
    var _a, _b, _c;
    const obj = this.toObject();
    (_a = obj === null || obj === void 0 ? void 0 : obj.fullName) === null || _a === void 0 ? true : delete _a._id;
    (_b = obj === null || obj === void 0 ? void 0 : obj.orders) === null || _b === void 0 ? true : delete _b._id;
    (_c = obj === null || obj === void 0 ? void 0 : obj.address) === null || _c === void 0 ? true : delete _c._id;
    obj === null || obj === void 0 ? true : delete obj._id;
    obj === null || obj === void 0 ? true : delete obj.password;
    obj === null || obj === void 0 ? true : delete obj.__v;
    return obj;
};
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId: userId });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
