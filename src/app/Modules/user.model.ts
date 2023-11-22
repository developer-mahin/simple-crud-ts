import { Schema, model } from 'mongoose';
import { IOrder, IUser } from './user.interface';

const orderSchema = new Schema<IOrder>({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
});

const userSchema = new Schema<IUser>({
    userId: {
        type: Number,
        required: [true, 'User id is required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [6, 'Username must be at least 6 characters long'],
        maxlength: [20, 'Username must not exceed 20 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
        },
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobbies are required'],
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street is required'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
        },
    },
    orders: {
        type: [orderSchema]
    }
});

const User = model<IUser>('User', userSchema);
export default User;
