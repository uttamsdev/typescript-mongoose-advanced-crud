"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importStar(require("./user.validation"));
//Create an user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        //data validation using zod
        const zodParsedData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.userServices.createUserIntoDB(zodParsedData);
        const userWithoutOrders = result.toObject({
            transform: (doc, ret) => {
                var _a, _b;
                ret === null || ret === void 0 ? true : delete ret.orders;
                ret === null || ret === void 0 ? true : delete ret.password;
                ret === null || ret === void 0 ? true : delete ret._id;
                (_a = ret === null || ret === void 0 ? void 0 : ret.fullName) === null || _a === void 0 ? true : delete _a._id;
                (_b = ret === null || ret === void 0 ? void 0 : ret.address) === null || _b === void 0 ? true : delete _b._id;
                ret === null || ret === void 0 ? true : delete ret.__v;
            },
        });
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: userWithoutOrders,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: error,
        });
    }
});
//Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: error,
        });
    }
});
//get single user by id
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getSingleUserFromDB(Number(userId));
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: '404',
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: error,
        });
    }
});
//Update a single user by id
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const { userId } = req.params;
        const zodParsedData = user_validation_1.userUpdateValidationSchema.parse(userData);
        const response = {
            userId: zodParsedData.userId,
            username: zodParsedData.username,
            fullName: zodParsedData.fullName,
            age: zodParsedData.age,
            isActive: zodParsedData.isActive,
            hobbies: zodParsedData.hobbies,
            address: zodParsedData.address
        };
        const result = yield user_service_1.userServices.updateSingleUserFromDB(Number(userId), zodParsedData);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User updated successfully!',
                data: response,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: '404',
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: error,
        });
    }
});
//delete a single user by id
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.deleteUserFromDB(Number(userId));
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: '404',
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: error,
        });
    }
});
//Create order 
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const { userId } = req.params;
        const zodParsedData = user_validation_1.userOrderValidationSchema.parse(orderData);
        const result = yield user_service_1.userServices.createOrderToDB(Number(userId), zodParsedData);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: '404',
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: error,
        });
    }
});
//Get orders by id
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getOrdersFromDB(Number(userId));
        const ordersWithoutId = result === null || result === void 0 ? void 0 : result.toObject({
            transform: (doc, ret) => {
                ret === null || ret === void 0 ? true : delete ret._id;
            },
        });
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Order fetched successfully!',
                data: ordersWithoutId,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: '404',
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: error,
        });
    }
});
//Calculate total price of orders by id
const calCulateTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.calculateTotalPriceFromDB(Number(userId));
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Total price calculated successfully!',
                data: {
                    totalPrice: result[0].totalPrice,
                },
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: '404',
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: error,
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    createOrder,
    getOrders,
    calCulateTotalPrice,
};
