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

export const UserControllers = {
    createUser
}