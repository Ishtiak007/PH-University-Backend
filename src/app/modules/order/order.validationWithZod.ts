import mongoose from 'mongoose';
import { z } from 'zod';

export const orderZodValidation = z.object({
  email: z.string().email('The email address provided is invalid'),
  product: z.string().refine((id) => mongoose.isValidObjectId(id), {
    message: 'The Product ID provided is invalid',
  }),
  quantity: z
    .number()
    .int('Quantity must be an integer value')
    .positive('Quantity must be greater than 0'),
  totalPrice: z.number().nonnegative('Total price cannot be a negative value'),
});
