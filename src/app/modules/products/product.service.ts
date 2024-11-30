import { IStationaryProduct } from './product.interface';
import { StationeryProductModel } from './product.model';

// .........................................................
// Implement functionality for creating a product
const createStationeryProductIntoDB = async (product: IStationaryProduct) => {
  const result = await StationeryProductModel.create(product);
  return result;
};

// ..........................................................
// Implement search functionality for retrieving all products
const getAllProductsFromDB = async (searchTerm?: string) => {
  const filter = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

  const result = await StationeryProductModel.find(filter);
  return result;
};

// ...........................................................
// Retrieve a single stationery product by its ID
const getSingleProductFromDB = async (id: string) => {
  const result = await StationeryProductModel.findOne({ _id: id });
  return result;
};

// ...........................................................
// Update a single product based on its ID
const updateAsingleProduct = async (
  id: string,
  updatedProduct: Partial<IStationaryProduct>,
) => {
  const result = await StationeryProductModel.findByIdAndUpdate(
    { _id: id },
    { $set: updatedProduct },
    { new: true, runValidators: true },
  );
  return result;
};

// ............................................................
// Delete a single product from the database by its ID
const deleteAProductFromDB = async (id: string) => {
  const result = await StationeryProductModel.deleteOne({ _id: id });
  return result;
};

export const stationeryProductServices = {
  createStationeryProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateAsingleProduct,
  deleteAProductFromDB,
};
