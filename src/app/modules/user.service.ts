import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async( userData : TUser) => {
    const result = await User.create(userData);
    return result;
}


const getUsersFromDB = async() => {
    const result = await User.find().select({username: 1, fullName: 1, age: 1, email: 1, address: 1})
    return result;
}

const getSingleUserFromDB = async (userId: number) => {
  if(await User.isUserExists(userId)){
    // throw new Error("User already exist");
    const result = await User.findOne({userId: userId})
    return result;
  }
    
  };
export const userServices = {
    createUserIntoDB,
    getUsersFromDB,
    getSingleUserFromDB
}