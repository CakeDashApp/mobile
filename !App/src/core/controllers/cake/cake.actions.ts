import { CakeInterface } from "./cake.interface";
import { CAKES, randomCakeKey } from "./cake.controller";
import {
  FETCH_CAKE,
  REMOVE_CAKE,
  UPDATE_CAKE,
  UPDATE_CAKE_IS_VISIBLE,
} from "./cake.routes";
import { generateId } from "../../helper/general/id.helper";
import { sendCoreLog } from "../../helper/general/logger.helper";
import { formatDateToUTC } from "../../helper/general/date.helper";
import { ErrorInterface } from "../error/error.interface";
import { fetchProduct } from "../product/product.actions";
import {
  createImage,
  generateImage,
  removeImage,
} from "../image/image.actions";
import { fetchMember, setMemberCakeIds } from "../member/member.actions";
import { setTeamCakeIds } from "../team/team.actions";

// Cake Groups
// general
// teamId
// memberId
// userId

//======================================================================================================================
// Create Cake
//======================================================================================================================

export const createCake = async (
  teamId: string,
  memberId: string,
  productId: string | null,
  id?: string
): Promise<CakeInterface | ErrorInterface> => {
  sendCoreLog("Create Cake ", {
    teamId: teamId,
    memberId: memberId,
    productId: productId,
  });

  // Date
  const date: string = formatDateToUTC(new Date());

  // Cake
  const cakeId = id || generateId();
  let cake: CakeInterface;

  // Fetch Product
  const product = productId ? await fetchProduct(productId) : null;
  if (product !== null && "error" in product) return product;

  // Fetch Member
  const member = await fetchMember(memberId);
  if ("error" in member) return member;

  // Create New Image if no Product
  let productImageId = product?.productData.imageId || "";
  if (!product) {
    const image = await createImage(generateImage("cake").imageData);
    if (!("error" in image)) productImageId = image.id;
  }

  // Create Cake
  cake = {
    id: cakeId,
    teamId: teamId,
    memberId: memberId,
    cakeData: {
      date: {
        creationDate: date,
        endDate: null,
      },
      product: {
        id: productId,
        imageId: productImageId,
        name: product?.productData.name || randomCakeKey,
      },
    },
    isVisible: true,
  };

  // Update Cake
  const updateCakeResponse = await UPDATE_CAKE(cakeId, cake, true);
  if (updateCakeResponse !== null && "error" in updateCakeResponse)
    return updateCakeResponse;

  const userId = member.userId;

  // Core
  CAKES.collect(cake, memberId);
  CAKES.collect(cake, teamId);
  CAKES.collect(cake, userId);
  CAKES.collect(cake, "default");

  // Update Member CakeIds
  const updatedMember = await setMemberCakeIds(memberId, cakeId, true);
  if ("error" in updatedMember) return updatedMember;

  // Update Team CakeIds
  const updatedTeam = await setTeamCakeIds(teamId, cakeId, true);
  if ("error" in updatedTeam) return updatedTeam;

  sendCoreLog("End Create Cake");
  return cake;
};

//======================================================================================================================
// Fetch Cake
//======================================================================================================================

export const fetchCake = async (
  id: string
): Promise<CakeInterface | ErrorInterface> => {
  sendCoreLog("Fetch Cake " + id);

  const cake = CAKES.getItemById(id);
  if (cake && cake.exists) return cake.copy();

  // Fetch Cake
  const firebaseCake: CakeInterface | ErrorInterface = await FETCH_CAKE(
    id,
    true
  );
  if ("error" in firebaseCake) return firebaseCake;

  // Check if Cake Object is complete
  if (
    !firebaseCake.cakeData ||
    !firebaseCake.cakeData.product ||
    !firebaseCake.cakeData.date
  )
    return {
      error: {
        message: "Failed to fetch Cake!",
        type: "firebase",
        e: null,
      },
    };

  // Format Fetched Values
  firebaseCake.cakeData.product.imageId =
    firebaseCake.cakeData.product.imageId || null;

  // Fetch Member
  const member = await fetchMember(firebaseCake.memberId);
  if ("error" in member) return member;

  // Core
  CAKES.collect(firebaseCake, firebaseCake.memberId);
  CAKES.collect(firebaseCake, firebaseCake.teamId);
  CAKES.collect(firebaseCake, member.userId);

  return firebaseCake;
};

//======================================================================================================================
// Fetch Cakes
//======================================================================================================================

export const fetchCakes = async (
  cakeIds: string[]
): Promise<ErrorInterface | CakeInterface[]> => {
  sendCoreLog("Fetch Cakes");

  // Error
  let error: ErrorInterface | null = null;

  // Cakes
  const cakes: CakeInterface[] = [];

  // Create Cake Promises
  const cakePromises: Promise<CakeInterface | ErrorInterface>[] = [];
  for (let i = 0; i < cakeIds.length; i++) {
    cakePromises.push(
      new Promise<CakeInterface | ErrorInterface>(async (resolve) => {
        resolve(await fetchCake(cakeIds[i]));
      })
    );
  }

  // Evaluate Cake Promises
  const cakePromisesResult = await Promise.all(cakePromises);
  for (let i = 0; i < cakePromisesResult.length; i++) {
    if (!("error" in cakePromisesResult[i]))
      cakes.push(cakePromisesResult[i] as CakeInterface);
    else error = cakePromisesResult[i] as ErrorInterface;
  }

  sendCoreLog("End Fetch Cakes");
  return error || cakes;
};

//======================================================================================================================
// Set Cake IsVisible
//======================================================================================================================

export const setCakeIsVisible = async (
  id: string,
  isVisible: boolean
): Promise<CakeInterface | ErrorInterface> => {
  sendCoreLog("Set Cake isVisible " + id, { isVisible: isVisible });

  // Fetch Cake
  const cake = await fetchCake(id);
  if ("error" in cake) return cake;

  // Update Values
  cake.isVisible = isVisible;

  // Update Cake isVisible
  const updateCakeIsVisibleResponse = await UPDATE_CAKE_IS_VISIBLE(
    id,
    isVisible
  );
  if (
    updateCakeIsVisibleResponse !== null &&
    "error" in updateCakeIsVisibleResponse
  )
    return updateCakeIsVisibleResponse;

  // Core
  CAKES.update(id, cake);

  sendCoreLog("End Set Cake isVisible " + id);
  return cake;
};

//======================================================================================================================
// Remove Cake
//======================================================================================================================

export const removeCake = async (
  id: string,
  _setMemberCakeIds = true,
  _setTeamCakeIds = true
): Promise<ErrorInterface | null> => {
  sendCoreLog("Remove Cake " + id);

  // Fetch Cake
  const cake = await fetchCake(id);
  if ("error" in cake) return cake;

  // Update Member CakeIds
  if (_setMemberCakeIds) {
    const updatedMember = await setMemberCakeIds(cake.memberId, id, false);
    if ("error" in updatedMember) return updatedMember;
  }

  // Update Team CakeIds
  if (_setTeamCakeIds) {
    const updatedTeam = await setTeamCakeIds(cake.teamId, id, false);
    if ("error" in updatedTeam) return updatedTeam;
  }

  // Remove Image
  if (!cake.cakeData.product.id && cake.cakeData.product.imageId)
    await removeImage(cake.cakeData.product.imageId);

  // Remove Cake
  const removeCakeResponse = await REMOVE_CAKE(id);
  if (removeCakeResponse !== null && "error" in removeCakeResponse)
    return removeCakeResponse;

  // Core
  CAKES.remove(id).everywhere();

  sendCoreLog("End Remove Cake " + id);
  return null;
};
