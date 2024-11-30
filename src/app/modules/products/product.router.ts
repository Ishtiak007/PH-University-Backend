import express, { Request, Response } from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// Create a product from database
router.post('/', ProductControllers.createProduct); //Endpoint: /api/products

// get all products from database
router.get('/', ProductControllers.getAllStationeryProducts); //Endpoint: /api/products

// get single product by its ID from database
router.get('/:productId', ProductControllers.getSingleProductFromDB); //Endpoint: /api/products/:productId

// update a single product by its Id
router.put('/:productId', ProductControllers.updateAnySingleProduct); //Endpoint: /api/products/:productId

// delete a product from database
// router.delete('/:productId', ProductControllers.deleteAProductFromDB);
router.delete('/:productId', (req: Request, res: Response) => {
  ProductControllers.deleteAProductFromDB(req, res);
}); //Endpoint: /api/products/:productId

export const StationeryProductRoutes = router;
