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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select({
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.findOne({ userId: userId }).select("-orders");
        return result;
    }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSingleUserFromDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    //static method
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.updateOne({ userId: userId }, userData).select("-password");
        return result;
    }
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.deleteOne({ userId: userId });
        return result;
    }
});
const createOrderToDB = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.updateOne({ userId: userId }, { $push: { orders: orderData } });
        return result;
    }
});
const getOrdersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.findOne({ userId: userId }).select({ orders: 1 });
        return result;
    }
});
const calculateTotalPriceFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $unwind: "$orders"
            },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: { $multiply: ["$orders.price", "$orders.quantity"] } }
                }
            },
            {
                $project: { totalPrice: 1 }
            }
        ]);
        return result;
    }
});
exports.userServices = {
    createUserIntoDB,
    getUsersFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteUserFromDB,
    createOrderToDB,
    getOrdersFromDB,
    calculateTotalPriceFromDB
};
