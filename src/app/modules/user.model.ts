import { Schema, model } from 'mongoose';
import {
  TAddress,
  TOrders,
  TUser,
  TUserName,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required it cannot be empty'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required it cannot be empty'],
  },
});

const userAddressSchema = new Schema<TAddress>({
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

const userOrderSchema = new Schema<TOrders>({
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

const userSchema = new Schema<TUser, UserModel>(
  {
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
  },
);

//model
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj?.fullName?._id;
  delete obj?.orders?._id;
  delete obj?.address?._id;
  delete obj?._id;
  delete obj?.password;
  delete obj?.__v
  
  return obj;
};


userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId: userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
