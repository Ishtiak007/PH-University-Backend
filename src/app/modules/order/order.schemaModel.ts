import mongoose, { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

// Create a schema for the Order model
const OrderSchema: Schema = new Schema<IOrder>(
  {
    email: {
      type: String, // Store the email of the customer
      required: [true, 'Email is required for purchasing product'],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Regular expression to validate email format
        'Please enter a valid email',
      ],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StationeryProductModel',
      required: [true, 'Product is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Product total price is required'],
      min: [0, "Total price can't be negative"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Create and export the Order model based on the schema
const OrderModel = model<IOrder>('OrdersCollection', OrderSchema);

export default OrderModel;
