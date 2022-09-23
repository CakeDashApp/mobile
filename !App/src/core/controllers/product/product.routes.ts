import { get, remove, update } from "../../api/firebase";
import { ProductInterface } from "./product.interface";
import { ErrorInterface } from "../error/error.interface";

export const FETCH_PRODUCT = async (
  id: string
): Promise<ProductInterface | ErrorInterface> => {
  if (id === "")
    return {
      error: {
        message: "Failed to fetch Product by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get Product
  const product = await get(`products/${id}`);
  if (!product)
    return {
      error: {
        message: "Failed to fetch Product by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return product;
};

export const UPDATE_PRODUCT = async (
  id: string,
  product: ProductInterface
): Promise<null | ErrorInterface> => {
  // Update Product
  let updateResponse = await update(`products/${id}`, product);
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Product by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const REMOVE_PRODUCT = async (
  id: string
): Promise<null | ErrorInterface> => {
  // Remove Product
  let removeResponse = await remove(`products/${id}`);
  if (removeResponse && "error" in removeResponse)
    return {
      error: {
        message: "Failed to remove Product by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};
