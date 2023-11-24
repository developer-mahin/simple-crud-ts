import { Request, Response } from 'express';
import createError from 'http-errors';
import userValidation from './user.validation';
import { userService } from './user.service';
import User from './user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    if (!userData) {
      throw createError(404, 'user data not found');
    }

    const isUserExist = await User.exists({ userId: userData.userId });
    if (isUserExist) {
      throw createError(500, 'User already have with this user id');
    }

    const validatedData = userValidation.parse(userData);
    const result = await userService.createUser(validatedData);

    if (!result) {
      throw createError(404, 'Not found');
    }
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User did created",
      error: {
        code: 500,
        description: "User did created"
      }
    })
  }
};

const getALlUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getALlUser();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!"
      }
    })
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw createError(404, 'user not found');
    }

    const isUserExist = await User.exists({ userId });
    if (!isUserExist) {
      throw createError(404, 'user not found');
    }

    const result = await userService.getSingleUser(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!"
      }
    })
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedDoc = req.body;

    const isUserExist = await User.exists({ userId });
    if (!isUserExist) {
      throw createError(404, 'user not found');
    }

    const result = await userService.updateUser(Number(userId), updatedDoc);

    res.status(200).json({
      success: true,
      message: 'Users update successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User did not update",
      error: {
        code: 500,
        description: "User did not update"
      }
    })
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const isUserExist = await User.exists({ userId });
    if (!isUserExist) {
      throw createError(404, 'user not found');
    }

    await userService.deleteUser(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User did not delete",
      error: {
        code: 500,
        description: "User did not delete"
      }
    })
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    const isUserExist = await User.exists({ userId });
    if (!isUserExist) {
      throw createError(404, 'user not found');
    }
    if (isUserExist) {
      await userService.createOrder(Number(userId), order);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order not created",
      error: {
        code: 404,
        description: "Order not created"
      }
    })
  }
};

const getOrderForSpecificUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const isUserExist = await User.exists({ userId });
    if (!isUserExist) {
      throw createError(404, 'user not found');
    }
    if (isUserExist) {
      const result = await userService.getOrderForSpecificUser(Number(userId));
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "order not found",
      error: {
        code: 404,
        description: "order not found!"
      }
    })
  }
};

const countTotalPrice = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const isUserExist = await User.exists({ userId });
    if (!isUserExist) {
      throw createError(404, 'user not found');
    }

    if (isUserExist) {
      const result = await userService.countTotalPrice(Number(userId));
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Did not calculate total price",
      error: {
        code: 404,
        description: "Did not calculate total price"
      }
    })
  }
};

export const userCollection = {
  createUser,
  getALlUser,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getOrderForSpecificUser,
  countTotalPrice,
};
