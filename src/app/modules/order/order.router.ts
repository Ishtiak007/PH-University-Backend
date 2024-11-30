import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

// Create an stationary shop order
router.post('/', orderController.createOrderController); //Endpoint: /api/orders

//calculateing the revenue
router.get('/revenue', orderController.calculateTheRevenueController); //Endpoint: /api/orders/revenue

// get all the orders list from db
router.get('/', orderController.fetchAllOrders); //Endpoint: /api/orders

export const OrderProductRoutes = router;
