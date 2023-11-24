"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOrderValidationSchema = void 0;
const zod_1 = require("zod");
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).refine(data => data.length > 0, {
        message: 'First name is required and cannot be empty',
    }),
    lastName: zod_1.z.string().min(1).refine(data => data.length > 0, {
        message: 'Last name is required and cannot be empty',
    }),
});
const userAddressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1).refine(data => data.length > 0, {
        message: 'Street is required and cannot be empty',
    }),
    city: zod_1.z.string().min(1).refine(data => data.length > 0, {
        message: 'City is required and cannot be empty',
    }),
    country: zod_1.z.string().min(1).refine(data => data.length > 0, {
        message: 'Country is required and cannot be empty',
    }),
});
exports.userOrderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number()
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().positive('User ID must be a positive number').refine(data => data > 0, {
        message: 'User ID is required and must be a positive number',
    }),
    username: zod_1.z.string().min(1).refine(data => data.length > 0, {
        message: 'Username is required and cannot be empty',
    }),
    password: zod_1.z.string().min(1).refine(data => data.length > 0, {
        message: 'Password is required and cannot be empty',
    }),
    fullName: userNameSchema.refine(data => data.firstName.length > 0 && data.lastName.length > 0, {
        message: 'Full name is required and cannot be empty',
    }),
    age: zod_1.z.number().positive('Age must be a positive number').refine(data => data > 0, {
        message: 'Age is required and must be a positive number',
    }),
    email: zod_1.z.string().email('Invalid email format').refine(data => data.length > 0, {
        message: 'Email is required and cannot be empty',
    }),
    isActive: zod_1.z.boolean().refine(data => data !== undefined, {
        message: 'isActive is required',
    }).default(true),
    hobbies: zod_1.z.array(zod_1.z.string().min(1)).refine(data => data.length > 0, {
        message: 'Hobbies is required and cannot be empty',
    }),
    address: userAddressSchema.refine(data => data.street.length > 0 && data.city.length > 0 && data.country.length > 0, {
        message: 'Address is required and cannot be empty',
    }),
    orders: zod_1.z.array(exports.userOrderValidationSchema).optional(),
});
exports.default = userValidationSchema;
