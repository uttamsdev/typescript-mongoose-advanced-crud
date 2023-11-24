/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema, {
  userOrderValidationSchema, userUpdateValidationSchema,
} from './user.validation';
import { TOrders } from './user.interface';
import { any } from 'zod';

//Create an user
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    //data validation using zod
    const zodParsedData = userValidationSchema.parse(userData);
    const result = await userServices.createUserIntoDB(zodParsedData);
    const userWithoutOrders = result.toObject({
      transform: (doc, ret) => {
        delete ret?.orders;
        delete ret?.password;
        delete ret?._id;
        delete ret?.fullName?._id;
        delete ret?.address?._id;
        delete ret?.__v
      },
    });
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: userWithoutOrders,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};

//Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};

//get single user by id
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDB(Number(userId));
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: '404',
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};

//Update a single user by id
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;
    const zodParsedData = userUpdateValidationSchema.parse(userData);
    const response = {
      userId: zodParsedData.userId,
      username: zodParsedData.username,
      fullName: zodParsedData.fullName,
      age: zodParsedData.age,
      isActive: zodParsedData.isActive,
      hobbies: zodParsedData.hobbies,
      address: zodParsedData.address
    }
    const result = await userServices.updateSingleUserFromDB(
      Number(userId),
      zodParsedData,
    );
    

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: response,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: '404',
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};

//delete a single user by id
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUserFromDB(Number(userId));
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: '404',
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};

//Create order 
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { userId } = req.params;
    const zodParsedData: TOrders = userOrderValidationSchema.parse(orderData);
    const result = await userServices.createOrderToDB(
      Number(userId),
      zodParsedData,
    );
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: '404',
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};

//Get orders by id
const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getOrdersFromDB(Number(userId));
    const ordersWithoutId = result?.toObject({
      transform: (doc, ret) => {
        delete ret?._id;
      },
    });
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: ordersWithoutId,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: '404',
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};

//Calculate total price of orders by id
const calCulateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.calculateTotalPriceFromDB(Number(userId));
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: {
          totalPrice: result[0].totalPrice,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: '404',
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  createOrder,
  getOrders,
  calCulateTotalPrice,
};
