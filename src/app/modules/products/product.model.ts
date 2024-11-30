import { model, Schema } from 'mongoose';
import { IStationaryProduct } from './product.interface';

// Mongoose schema for stationery products using the IStationaryProduct interface
const stationeryProductSchema = new Schema<IStationaryProduct>(
  {
    name: {
      type: String,
      required: [true, 'ValidationError'],
      trim: true, // Remove extra spaces
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price must be a positive number'],
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
      ], // enum type category
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
    versionKey: false,
  },
);

// Create and export the Mongoose model for stationery products
export const StationeryProductModel = model<IStationaryProduct>(
  'StationeryProductModelCollection', // Collection name in the database
  stationeryProductSchema,
);
