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
    const result = await User.findOne({ userId: userId }).select("-orders");
    return result;
  }
};

const updateSingleUserFromDB = async (userId: number, userData: TUser) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne({ userId: userId }, userData).select("-password");
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
    const result = await User.updateOne(
      { userId: userId },
      { $push: { orders: orderData } },
    );
    return result;
  }
};

const getOrdersFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId: userId }).select({ orders: 1 });
    return result;
  }
};

const calculateTotalPriceFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
        {
          $match: {userId: userId}
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
            $project: {totalPrice: 1}
        }
      ]);
      
    
    return result;
  }
};
export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteUserFromDB,
  createOrderToDB,
  getOrdersFromDB,
  calculateTotalPriceFromDB
};
