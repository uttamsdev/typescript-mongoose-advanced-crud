import { Model } from "mongoose";

export type TUserName = {
    firstName: string;
    lastName: string;
};

export type TAddress = {
    street: string;
    city: string;
    country: string;
}

export type TOrders = {
    productName: string;
    price: number;
    quantity: number;
}
export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TUserName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: Array<string>
    address: TAddress;
    orders: Array<TOrders>;
};

export interface UserModel extends Model<TUser>{
    isUserExists(id: string): Promise<TUser | null>
}