/* eslint-disable @typescript-eslint/no-explicit-any */
import { StationeryProductModel } from '../products/product.model';
import OrderModel from './order.schemaModel';
// ................................................................
const createAnOrder = async (orderData: {
  email: string;
  product: string;
  quantity: number;
}): Promise<any> => {
  const { email, product, quantity } = orderData;
  const productDoc = await StationeryProductModel.findById(product);

  // Fetch the product document from the database using the product ID
  if (!productDoc) throw new Error('Product not found');

  // If the product does not exist, throw and errorHandle insufficient stock
  if (productDoc.quantity < quantity) {
    throw new Error('Insufficient stock for this product');
  }
  //   Total Price
  const totalPrice = Math.round(productDoc.price * quantity);

  // create the order
  const newOrder = new OrderModel({
    email,
    product,
    quantity,
    totalPrice,
  });
  await newOrder.save();
  //   updated the database
  productDoc.quantity -= quantity;
  productDoc.inStock = productDoc.quantity > 0;
  await productDoc.save();
  return newOrder;
};

//..........................................................................
// Get all orders data from database
const getAllTheOrders = async () => {
  const result = await OrderModel.find();
  return result;
};

//..........................................................................
// Calculate Revenue from Orders
const calculateRevenueBasisTotalPrice = async (): Promise<any> => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  const totalRevenue = Math.round(result[0]?.totalRevenue || 0);

  return { totalRevenue };
};

export const orderService = {
  createAnOrder,
  getAllTheOrders,
  calculateRevenueBasisTotalPrice,
};
