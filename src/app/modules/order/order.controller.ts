/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderService } from './order.service';
import { orderZodValidation } from './order.validationWithZod';

//..............................................................
// Implement controller to handle the creation of new orders
const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    // Implement order validation schema using Zod
    const validatedOrders = orderZodValidation.parse(order);
    const result = await orderService.createAnOrder(validatedOrders);
    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Order creation failed',
      success: false,
      errors: {
        name: error.name,
        errors: error.errors,
      },
      stack: error.stack,
    });
  }
};

//.............................................................
// Develop a controller to retrieve all orders
const fetchAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllTheOrders();
    res.status(200).json({
      success: true,
      message: 'Successfully find all orders',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fine the order data!',
      errors: {
        name: error.name,
        errors: error.errors,
      },
      stack: error.stack,
    });
  }
};

//...............................................................
// Calculateing the Revenue from Orders
const calculateTheRevenueController = async (req: Request, res: Response) => {
  try {
    const result = await orderService.calculateRevenueBasisTotalPrice();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Failed to calculate the revenue',
      success: false,
      errors: {
        name: error.name,
        errors: error.errors,
      },
      stack: error.stack,
    });
  }
};

export const orderController = {
  createOrderController,
  fetchAllOrders,
  calculateTheRevenueController,
};
