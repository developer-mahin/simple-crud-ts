import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import userValidation from "./user.validation";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userData = req.body;
        if (!userData) {
            throw createError(404, "user data not found")
        }
        const validatedData = userValidation.parse(userData);
        const result = await userService.createUser(validatedData)

        if (result) {
            res.status(201).json({
                success: true,
                message: "User created successfully!",
                data: result
            })
        } else {
            res.status(400).json({
                success: false,
                message: "User not found",
                error: {
                    code: 400,
                    description: "User not found!"
                }
            })

        }

    } catch (error) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message
            next(errorMessage)
        }
    }
}


export const userCollection = {
    createUser
}