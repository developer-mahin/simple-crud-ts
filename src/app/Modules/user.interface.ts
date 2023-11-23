import { Model } from "mongoose";

/* eslint-disable no-unused-vars */
export type IOrder = {
    productName: string;
    price: number;
    quantity: number;
};

export type IUser = {
    userId: number;
    username: string;
    password: string;
    fullName: {
        firstName: string;
        lastName: string;
    };
    age: number;
    email: string;
    isActive: true | false;
    hobbies: string[];
    address: {
        street: string;
        city: string;
        country: string;
    };
    orders?: IOrder[];
};


export type IUserMethods = {
    isUserExists: (id: number) => Promise<IUser | null>
}

export type IUserModel = Model<IUser, Record<string, never>, IUserMethods>