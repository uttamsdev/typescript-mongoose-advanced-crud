import { TOrders, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const getUsersFromDB = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId: userId });
    return result;
  }
};

const updateSingleUserFromDB = async (userId: number, userData: TUser) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne({ userId: userId }, userData);
    return result;
  }
};

const deleteUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId: userId });
    return result;
  }
};

const createOrderToDB = async (userId: number, orderData: TOrders) => {
    if (await User.isUserExists(userId)) {
      const result = await User.updateOne({ userId: userId },{$push: {orders: orderData}});
      return result;
    }
  };
export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteUserFromDB,
  createOrderToDB
};
