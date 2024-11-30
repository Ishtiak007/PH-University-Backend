/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { stationeryProductServices } from './product.service';
import productValidationWithZod from './product.validationWithZod';

// .....................................................................
// Implement functionality for creating a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const dataValidationZod = productValidationWithZod.parse(productData);
    const result =
      await stationeryProductServices.createStationeryProductIntoDB(
        dataValidationZod,
      );
    res.status(200).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Product created failed!',
      success: false,
      errors: {
        name: error.name,
        errors: error.errors,
      },
      stack: error.stack,
    });
  }
};
// ......................................................................
// Add functionality to fetch all stationery products
const getAllStationeryProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await stationeryProductServices.getAllProductsFromDB(
      searchTerm as string,
    );
    res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Product retrieved failed!',
      success: false,
      errors: {
        name: error.name,
        errors: error.errors,
      },
      stack: error.stack,
    });
  }
};
// ......................................................................
// Retrieve a single stationery product by its ID
const getSingleProductFromDB = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result =
      await stationeryProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Product retrieved failed!',
      success: false,
      errors: {
        name: error.name,
        errors: error.errors,
      },
      stack: error.stack,
    });
  }
};
// ...........................................................
// Update a single product based on its ID
const updateAnySingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProduct = req.body;
    const result = await stationeryProductServices.updateAsingleProduct(
      productId,
      updatedProduct,
    );
    res.status(200).json({
      message: 'Products updated successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Product updated failed!',
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
// Delete a single product from the database by its ID
const deleteAProductFromDB = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result =
      await stationeryProductServices.deleteAProductFromDB(productId);
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
        data: {},
      });
    }
    res.status(200).json({
      message: 'Product deleted successfully',
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Product deleted Failed!',
      success: false,
      errors: {
        name: error.name,
        errors: error.errors,
      },
      stack: error.stack,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllStationeryProducts,
  getSingleProductFromDB,
  updateAnySingleProduct,
  deleteAProductFromDB,
};
