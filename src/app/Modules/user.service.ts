import { IOrder, IUser } from "./user.interface"
import User from "./user.model"

const createUser = async (userData: IUser) => {
    const result = await User.create(userData)
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
    const result = await User.findOneAndUpdate({ userId: id }, updatedDoc, { new: true })
    return result
}

const deleteUser = async (id: number) => {
    const result = await User.findOneAndDelete({ userId: id }, { new: true })
    return result
}

const createOrder = async (id: number, order: IOrder) => {
    const result = await User.findOneAndUpdate({ userId: id }, { $push: { orders: order } }, { new: true })
    return result
}

const getOrderForSpecificUser = async (id: number) => {
    const result = await User.aggregate([
        { $match: { userId: id } },
        { $project: { orders: 1 } }
    ])
    return result
}

export const userService = {
    createUser,
    getALlUser,
    getSingleUser,
    updateUser,
    deleteUser,
    createOrder,
    getOrderForSpecificUser
}