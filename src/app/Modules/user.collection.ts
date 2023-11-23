import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import userValidation from "./user.validation";
import { userService } from "./user.service";
import User from "./user.model";



const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userData = req.body;
        if (!userData) {
            throw createError(404, "user data not found")
        }

        const isUserExist = await User.exists({ userId: userData.userId })
        if (isUserExist) {
            throw createError(404, "User already have with this user id")
        }

        const validatedData = userValidation.parse(userData);
        const result = await userService.createUser(validatedData)

        if (!result) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            })
        }
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result
        })

    } catch (error) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message
            next(errorMessage)
        }
    }
}

const getALlUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getALlUser()

        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })

    } catch (error) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message
            next(errorMessage)
        }
    }
}


const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { userId } = req.params
        if (!userId) {
            throw createError(404, "user not found")
        }

        const isUserExist = await User.exists({ userId })
        if (!isUserExist) {
            throw createError(404, "user not found")
        }

        const result = await userService.getSingleUser(Number(userId))
        if (result === null) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            })
        }
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })

    } catch (error) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message
            next(errorMessage)
        }
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { userId } = req.params
        const updatedDoc = req.body;

        const isUserExist = await User.exists({ userId })
        if (!isUserExist) {
            throw createError(404, "user not found")
        }

        const result = await userService.updateUser(Number(userId), updatedDoc)
        if (!result) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            })
        }
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })

    } catch (error) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message
            next(errorMessage)
        }
    }
}
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { userId } = req.params
        const isUserExist = await User.exists({ userId })
        if (!isUserExist) {
            throw createError(404, "user not found")
        }

        await userService.deleteUser(Number(userId))
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null
        })

    } catch (error) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message
            next(errorMessage)
        }
    }
}


export const userCollection = {
    createUser,
    getALlUser,
    getSingleUser,
    updateUser,
    deleteUser
}