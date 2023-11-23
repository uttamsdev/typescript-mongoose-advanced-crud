import { Schema, model } from "mongoose";
import { TAddress, TOrders, TUser, TUserName, UserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../config";


const userNameSchema = new Schema<TUserName>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

const userAddressSchema = new Schema<TAddress>({
    street: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true}
})

const userOrderSchema = new Schema<TOrders>({
    productName: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}
})

const userSchema = new Schema<TUser, UserModel>({
    userId: {type: Number, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    fullName: {type: userNameSchema, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    isActive: {type: Boolean, required: true},
    hobbies: {type: [String], required: true},
    address: {type: userAddressSchema, required: true},
    orders: {type: [userOrderSchema]}
})



//model
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds))
    next();
})

userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    // delete obj.orders;
    return obj;
  }

// userSchema.post('save', async function(doc, next){
    
// })
userSchema.statics.isUserExists = async function(userId: number){
    const existingUser = await User.findOne({userId: userId});
    return existingUser;
}

export const User = model<TUser, UserModel>('User',userSchema);