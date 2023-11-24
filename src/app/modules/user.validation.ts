import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z.string().min(1).refine(data => data.length > 0, {
    message: 'First name is required and cannot be empty',
  }),
  lastName: z.string().min(1).refine(data => data.length > 0, {
    message: 'Last name is required and cannot be empty',
  }),
});

const userAddressSchema = z.object({
  street: z.string().min(1).refine(data => data.length > 0, {
    message: 'Street is required and cannot be empty',
  }),
  city: z.string().min(1).refine(data => data.length > 0, {
    message: 'City is required and cannot be empty',
  }),
  country: z.string().min(1).refine(data => data.length > 0, {
    message: 'Country is required and cannot be empty',
  }),
});

const userOrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number()
});

const userValidationSchema = z.object({
  userId: z.number().positive('User ID must be a positive number').refine(data => data > 0, {
    message: 'User ID is required and must be a positive number',
  }),
  username: z.string().min(1).refine(data => data.length > 0, {
    message: 'Username is required and cannot be empty',
  }),
  password: z.string().min(1).refine(data => data.length > 0, {
    message: 'Password is required and cannot be empty',
  }),
  fullName: userNameSchema.refine(data => data.firstName.length > 0 && data.lastName.length > 0, {
    message: 'Full name is required and cannot be empty',
  }),
  age: z.number().positive('Age must be a positive number').refine(data => data > 0, {
    message: 'Age is required and must be a positive number',
  }),
  email: z.string().email('Invalid email format').refine(data => data.length > 0, {
    message: 'Email is required and cannot be empty',
  }),
  isActive: z.boolean().refine(data => data !== undefined, {
    message: 'isActive is required',
  }).default(true),
  hobbies: z.array(z.string().min(1)).refine(data => data.length > 0, {
    message: 'Hobbies is required and cannot be empty',
  }),
  address: userAddressSchema.refine(data => data.street.length > 0 && data.city.length > 0 && data.country.length > 0, {
    message: 'Address is required and cannot be empty',
  }),
  orders: z.array(userOrderSchema).optional(),
});

export default userValidationSchema;
