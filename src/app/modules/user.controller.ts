/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async(req : Request, res : Response) => {

    try {
        const userData = req.body;
        const result = await userServices.createUserIntoDB(userData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result
          });
    } catch (error: any) {
        res.status(200).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: error,
          });
    }
}



const getAllUsers = async (req: Request, res: Response) => {
    try {
      const result = await userServices.getUsersFromDB();
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: result,
      });
    } catch (error : any) {
      res.status(200).json({
        success: false,
        message: error.message || 'Something went wrong.',
        data: error,
      });
    }
  };


  const getSingleUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const result = await userServices.getSingleUserFromDB(Number(userId));
     if(result){
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
                code: "404",
                description: "User not found!"
            }
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


  const updateSingleUser = async (req: Request, res: Response) => {
    try {
    const userData = req.body;
      const { userId } = req.params;
      const result = await userServices.updateSingleUserFromDB(Number(userId), userData);
     if(result){
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
                code: "404",
                description: "User not found!"
            }
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

  const deleteUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const result = await userServices.deleteUserFromDB(Number(userId));
     if(result){
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
                code: "404",
                description: "User not found!"
            }
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

  const createOrder = async (req: Request, res: Response) => {
    try {
      const orderData = req.body;
      const { userId } = req.params;
      console.log(userId);
      const result = await userServices.createOrderToDB(Number(userId), orderData);
     if(result){
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
                code: "404",
                description: "User not found!"
            }
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
    createOrder
}