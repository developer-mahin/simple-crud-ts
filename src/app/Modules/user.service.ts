import createError from "http-errors"
import { IUser } from "./user.interface"
import User from "./user.model"

const createUser = async (userData: IUser) => {
    // const result = await User.create(userData)
    const user = new User(userData)
    const result = await user.save()
    if (await result.isUserExists(userData.userId)) {
        throw createError(400, "user already exist please try another info")
    }
    return result
}

const getALlUser = async () => {
    const result = await User.aggregate([
        { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } }
    ])
    return result
}

const getSingleUser = async (id: number) => {
    const result = await User.findOne({ userId: id })
    return result
}

const updateUser = async (id: number, updatedDoc: IUser) => {
    const result = await User.findByIdAndUpdate({ userId: id }, updatedDoc)
    return result
}

const deleteUser = async (id: number) => {
    const result = await User.findOneAndDelete({ userId: id })
    return result
}

export const userService = {
    createUser,
    getALlUser,
    getSingleUser,
    updateUser,
    deleteUser
}