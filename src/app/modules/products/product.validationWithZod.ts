import { z } from 'zod';

const productValidationWithZod = z.object({
  name: z.string({ required_error: 'The product name field is mandatory' }),

  brand: z.string({
    required_error: 'he product brand name is a required field',
  }),

  price: z
    .number({ required_error: 'Product price must be required' })
    .min(0, { message: 'The price must be at least 0' }),

  category: z.enum(
    ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
    { required_error: 'The category is a mandatory field' },
  ),

  description: z.string({ required_error: 'Description must be required' }),

  quantity: z
    .number({ required_error: 'The quantity field is mandatory' })
    .min(0, { message: 'The quantity must be zero or a positive number' }),

  inStock: z.boolean({ required_error: 'inStock Filed is required' }),
});

export default productValidationWithZod;
