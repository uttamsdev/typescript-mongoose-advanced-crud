import { Schema, model } from "mongoose";
import { TAddress, TOrders, TUser, TUserName, UserModel } from "./user.interface";

const userNameSchema = new Schema<TUserName>({
    firstName: {type: String},
    lastName: {type: String}
})

const userAddressSchema = new Schema<TAddress>({
    street: {type: String},
    city: {type: String},
    country: {type: String}
})

const userOrderSchema = new Schema<TOrders>({
    productName: {type: String},
    price: {type: Number},
    quantity: {type: Number}
})

const userSchema = new Schema<TUser, UserModel>({
    userId: {type: Number, unique: true},
    username: {type: String, unique: true},
    password: {type: String},
    fullName: userNameSchema,
    age: {type: Number},
    email: {type: String},
    isActive: {type: Boolean},
    hobbies: {type: [String]},
    address: {type: userAddressSchema},
    orders: {type: [userOrderSchema]}
})


// userSchema.statics.isUserExists = async function(id: string){
//     const existingUser = await Student.findOne({id: id});
//     return existingUser;
// }

export const User = model<TUser, UserModel>('User',userSchema);