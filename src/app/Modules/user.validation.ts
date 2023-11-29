import { z } from 'zod';

const orderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

const userValidation = z.object({
  userId: z
    .number()
    .min(1, { message: "User Id can't be less than 1 character" }),
  username: z
    .string()
    .min(6, { message: "user-name can't be allow less than 6 character" })
    .max(20, { message: "user-name can't be allow more than 20 character" }),
  password: z
    .string()
    .min(6, { message: "Password can't be less than 6 character" }),
  fullName: z.object({
    firstName: z
      .string()
      .min(3, { message: "First name can't be less than 3 characters" })
      .max(20, { message: "First name can't be more than 20 characters" }),
    lastName: z
      .string()
      .min(3, { message: "Last name can't be less than 3 characters" })
      .max(20, { message: "Last name can't be more than 20 characters" }),
  }),
  age: z.number().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(
    z.string().min(1, { message: "Hobbies can't be an empty array" }),
  ),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
  }),
  orders: z.array(orderValidationSchema).optional(),
});

export default userValidation;
