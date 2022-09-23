import { PRODUCTS } from "./product.controller";
import { ProductInterface } from "./product.interface";
import {
  FETCH_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
} from "./product.routes";
import { generateId } from "../../helper/general/id.helper";
import { sendCoreLog } from "../../helper/general/logger.helper";
import { ImageInterface } from "../image/image.interface";
import { ErrorInterface } from "../error/error.interface";
import { createImage, removeImage } from "../image/image.actions";
import { setTeamProductIds } from "../team/team.actions";

// Product Groups:
// default
// teamId

//======================================================================================================================
// Create Product
//======================================================================================================================

export const createProduct = async (
  name: string,
  image: ImageInterface | null,
  teamId: string,
  id?: string,
  _setTeamProductIds = true
): Promise<ProductInterface | ErrorInterface> => {
  sendCoreLog("Create Product");

  // Create Image
  if (image) await createImage(image.imageData, image.id);

  // Product Id
  const productId = id || generateId();

  // Create Product
  const product: ProductInterface = {
    id: productId,
    teamId: teamId,
    productData: {
      name: name,
      imageId: image?.id || null,
      stats: {
        uses: 0,
        starAverage: 0,
      },
    },
  };

  // Update Product
  const updateProductResponse = await UPDATE_PRODUCT(productId, product);
  if (updateProductResponse !== null && "error" in updateProductResponse)
    return updateProductResponse;

  // Update Team ProductIds
  if (_setTeamProductIds) {
    const updatedTeam = await setTeamProductIds(teamId, productId, true);
    if ("error" in updatedTeam) return updatedTeam;
  }

  // Core
  PRODUCTS.collect(product, teamId);
  PRODUCTS.collect(product, "default");

  sendCoreLog("End Create Product");
  return product;
};

//======================================================================================================================
// Fetch Product
//======================================================================================================================

export const fetchProduct = async (
  id: string
): Promise<ProductInterface | ErrorInterface> => {
  sendCoreLog("Fetch Product " + id);

  const product = PRODUCTS.getItemById(id);
  if (product && product.exists) return product.copy();

  // Fetch Product
  const firebaseProduct = await FETCH_PRODUCT(id);
  if ("error" in firebaseProduct) return firebaseProduct;

  // Check if Product Object is complete
  if (!firebaseProduct.productData || !firebaseProduct.productData.stats)
    return {
      error: {
        message: "Failed to fetch Product!",
        type: "firebase",
        e: null,
      },
    };

  // Format Fetched Values
  firebaseProduct.productData.imageId =
    firebaseProduct.productData.imageId || null;

  PRODUCTS.collect(firebaseProduct, firebaseProduct.teamId);

  return firebaseProduct;
};

//======================================================================================================================
//Fetch Products
//======================================================================================================================

export const fetchProducts = async (
  productIds: string[]
): Promise<ErrorInterface | ProductInterface[]> => {
  sendCoreLog("Fetch Products");

  // Error
  let error: ErrorInterface | null = null;

  // Teams
  const products: ProductInterface[] = [];

  // Create Product Promises
  const productPromises: Promise<ProductInterface | ErrorInterface>[] = [];
  for (let i = 0; i < productIds.length; i++) {
    productPromises.push(
      new Promise<ProductInterface | ErrorInterface>(async (resolve) => {
        resolve(await fetchProduct(productIds[i]));
      })
    );
  }

  // Evaluate Product Promises
  const productPromisesResult = await Promise.all(productPromises);
  for (let i = 0; i < productPromisesResult.length; i++) {
    if (!("error" in productPromisesResult[i]))
      products.push(productPromisesResult[i] as ProductInterface);
    else error = productPromisesResult[i] as ErrorInterface;
  }

  sendCoreLog("End Fetch Products");
  return error || products;
};

//======================================================================================================================
//Remove Product
//======================================================================================================================

export const removeProduct = async (
  id: string,
  _setTeamProductIds = true
): Promise<ErrorInterface | null> => {
  sendCoreLog("Remove Product " + id);

  // Fetch Product
  const product = await fetchProduct(id);
  if ("error" in product) return product;

  // Remove Image
  if (product.productData.imageId)
    await removeImage(product.productData.imageId);

  // Update Team ProductIds
  if (_setTeamProductIds) {
    const updatedTeam = await setTeamProductIds(product.teamId, id, false);
    if ("error" in updatedTeam) return updatedTeam;
  }

  // Remove Product
  const removeProductResponse = await REMOVE_PRODUCT(id);
  if (removeProductResponse !== null && "error" in removeProductResponse)
    return removeProductResponse;

  // Core
  PRODUCTS.remove(id).everywhere();

  sendCoreLog("End Remove Product " + id);
  return null;
};
