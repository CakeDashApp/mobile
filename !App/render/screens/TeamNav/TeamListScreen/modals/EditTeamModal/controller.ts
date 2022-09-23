import core from "../../../../../../src/core";
import { generateId } from "../../../../../../src/core/helper/general/id.helper";
import strings from "./strings";
import { SuccessInterface } from "../../../../../../src/core/interfaces/success.interface";
import { ImageInterface } from "../../../../../../src/core/controllers/image/image.interface";
import { TeamInterface } from "../../../../../../src/core/controllers/team/team.interface";
import { ProductInterface } from "../../../../../../src/core/controllers/product/product.interface";
import { ErrorInterface } from "../../../../../../src/core/controllers/error/error.interface";

export interface EditTeamProductInterface {
  id: string;
  name: string;
  image: ImageInterface | null;
  imageId: string | null;
}

//======================================================================================================================
// Set Team Editor Values
//======================================================================================================================

export const setTeamEditorValues = async (
  teamId: string | null,
  team: TeamInterface | undefined,
  teamImage: ImageInterface | undefined
) => {
  // Update Original Values
  if (!team || !teamId) {
    TeamEditor.updateOriginValue({
      id: null,
      name: "",
      description: "",
      image: core.image.generateImage("users"),
      dashes: 3,
      status: "open",
      definedCakes: false,
      products: null,
      hiddenDasher: false,
      showJoinLeaveEvents: true,
    });
  } else {
    // Load Products
    let loadedProducts: EditTeamProductInterface[] = [];
    if (team.productIds)
      loadedProducts = await transformProductsToEditTeamProducts(
        team.productIds
      );

    TeamEditor.updateOriginValue({
      id: team.id,
      name: team.teamData.name,
      description: team.teamData.description,
      image: teamImage || null,
      dashes: team.teamData.settings.dashes,
      status: team.teamData.settings.status,
      definedCakes: team.teamData.settings.definedCakes,
      hiddenDasher: team.teamData.settings.hiddenDasher,
      showJoinLeaveEvents: team.teamData.settings.showJoinLeaveEvents,
      products: loadedProducts,
    });
  }
};

//======================================================================================================================
// Team Editor
//======================================================================================================================

export const TeamEditor = new core.helper.editor.Editor({
  data: {
    id: null,
    name: "",
    description: "",
    image: null,
    dashes: 3,
    status: "open",
    definedCakes: false,
    products: null,
    hiddenDasher: false,
    showJoinLeaveEvents: true,
  },
  onSubmit: async (data: any) => {
    // Update Team
    if (data.id) return await updateTeam(data);

    // Create Team
    return await _createTeam(data);
  },
  fixedProperties: ["id"],
  validateMethods: {
    name: async () => {
      const value: string = TeamEditor.getValue("name");

      if (value.length < 2) {
        TeamEditor.setStatus("name", "error", strings().nameErrorText);
        return false;
      }

      TeamEditor.resetStatus("name");
      return true;
    },
    description: async () => {
      const value: string = TeamEditor.getValue("description");

      if (value.length < 5) {
        TeamEditor.setStatus(
          "description",
          "error",
          strings().descriptionErrorText
        );
        return false;
      }

      TeamEditor.resetStatus("description");
      return true;
    },
    products: async () => {
      const products: ProductInterface[] = TeamEditor.getValue("products");
      const definedCakes: boolean = TeamEditor.getValue("definedCakes");

      if (definedCakes && products.length <= 0) {
        TeamEditor.setStatus(
          "products",
          "error",
          strings().definedCakesErrorText
        );
        return false;
      }

      TeamEditor.resetStatus("products");
      return true;
    },
  },
  editableProperties: [
    "name",
    "description",
    "image",
    "dashes",
    "definedCakes",
    "products",
    "hiddenDasher",
    "status",
    "showJoinLeaveEvents",
  ],
});

//======================================================================================================================
// Set Product Editor Values
//======================================================================================================================

export const setProductEditorValues = () => {
  ProductEditor.updateOriginValue({
    id: generateId(),
    name: "",
    image: core.image.generateImage("cake"),
  });
};

//======================================================================================================================
// Product Editor
//======================================================================================================================

export const ProductEditor = new core.helper.editor.Editor({
  data: {
    id: null,
    name: "",
    image: core.image.generateImage("cake"),
  },
  onSubmit: async (data: any) => {
    // Create new Product
    const newProduct: EditTeamProductInterface = {
      id: data.id,
      name: data.name,
      image: data.image,
      imageId: null,
    };

    // New Products
    const newProducts: EditTeamProductInterface[] = [
      ...TeamEditor.getValue("products"),
    ];
    newProducts.push(newProduct);

    // Update Team Editor
    TeamEditor.setValue("products", newProducts);

    return null;
  },
  fixedProperties: ["id", "name", "image"],
  validateMethods: {
    name: async () => {
      const value: string = ProductEditor.getValue("name");

      if (value.length < 2) {
        ProductEditor.setStatus(
          "name",
          "error",
          strings().productNameErrorText
        );
        return false;
      }

      ProductEditor.resetStatus("name");
      return true;
    },
  },
  editableProperties: ["image", "name"],
});

//======================================================================================================================
// Update Team
//======================================================================================================================

const updateTeam = async (
  data: any
): Promise<ErrorInterface | SuccessInterface> => {
  // Update Properties
  for (let property in data) {
    if (property === "image") {
      const imageResponse = await core.team.setTeamImage(
        data.id,
        data[property]
      );
      if ("error" in imageResponse) return imageResponse;

      // Update OriginValue
      TeamEditor.updateOriginValue({ image: data[property] });
    }

    if (property === "name") {
      const nameResponse = await core.team.setTeamName(data.id, data[property]);
      if ("error" in nameResponse) return nameResponse;

      // Update OriginValue
      TeamEditor.updateOriginValue({ name: data[property] });
    }

    if (property === "description") {
      const descriptionResponse = await core.team.setTeamDescription(
        data.id,
        data[property]
      );
      if ("error" in descriptionResponse) return descriptionResponse;

      // Update OriginValue
      TeamEditor.updateOriginValue({ description: data[property] });
    }

    if (property === "status") {
      const statusResponse = await core.team.setTeamStatus(
        data.id,
        data[property]
      );
      if ("error" in statusResponse) return statusResponse;

      // Update OriginValue
      TeamEditor.updateOriginValue({ status: data[property] });
    }

    if (property === "definedCakes") {
      const definedCakesResponse = await core.team.setTeamDefinedCakes(
        data.id,
        data[property]
      );
      if ("error" in definedCakesResponse) return definedCakesResponse;

      // Update OriginValue
      TeamEditor.updateOriginValue({ definedCakes: data[property] });
    }

    if (property === "hiddenDasher") {
      const hiddenDasherResponse = await core.team.setTeamHiddenDasher(
        data.id,
        data[property]
      );
      if ("error" in hiddenDasherResponse) return hiddenDasherResponse;

      // Update OriginValue
      TeamEditor.updateOriginValue({ hiddenDasher: data[property] });
    }

    if (property === "products") {
      const productsResponse = await core.team.setTeamProducts(
        data.id,
        data[property] || []
      );
      if ("error" in productsResponse) return productsResponse;

      // Update OriginValue
      TeamEditor.updateOriginValue({ products: data[property] });
    }

    if (property === "dashes") {
      const dashesResponse = await core.team.setTeamDashes(
        data.id,
        data[property]
      );
      if ("error" in dashesResponse) return dashesResponse;

      // Update OriginValue
      TeamEditor.updateOriginValue({ dashes: data[property] });
    }
  }

  return {
    success: {
      title: strings().teamUpdateSuccessTitle,
      message: strings().teamUpdateSuccessText,
    },
  };
};

//======================================================================================================================
// Create Team
//======================================================================================================================

const _createTeam = async (
  data: any
): Promise<ErrorInterface | SuccessInterface> => {
  // Team Data
  const name: string = data.name || "unknown";
  const description: string = data.description || "unknown";
  const image: ImageInterface =
    data.image || TeamEditor.getOriginalValue("image");
  const definedCakes: boolean =
    data.definedCakes || TeamEditor.getOriginalValue("definedCakes");
  const status: "open" | "closed" | "invite" =
    data.status || TeamEditor.getOriginalValue("status");
  const dashes: number = data.dashes || TeamEditor.getOriginalValue("dashes");
  const hiddenDasher: boolean =
    data.hiddenDasher || TeamEditor.getOriginalValue("hiddenDasher");
  const showJoinLeaveEvents: boolean =
    data.showJoinLeaveEvents ||
    TeamEditor.getOriginalValue("showJoinLeaveEvents");
  const products:
    | { id: string; name: string; image: ImageInterface | null }[]
    | undefined = definedCakes
    ? data.products.map((product: EditTeamProductInterface) => {
        return { id: product.id, name: product.name, image: product.image };
      })
    : undefined;

  // Create Team
  const createdTeam = await core.team.createTeam(
    name,
    description,
    image,
    {
      definedCakes: definedCakes,
      status: status,
      dashes: dashes,
      hiddenDasher: hiddenDasher,
      showJoinLeaveEvents: showJoinLeaveEvents,
    },
    products
  );
  if ("error" in createdTeam) return createdTeam;

  return {
    success: {
      title: strings().teamCreationSuccessTitle,
      message: strings().teamCreationSuccessText.replace("${name}", name),
    },
  };
};

//======================================================================================================================
// Transform Products To EditTeam Products
//======================================================================================================================

const transformProductsToEditTeamProducts = async (
  productIds: string[]
): Promise<EditTeamProductInterface[]> => {
  // Edit Team Products
  const editTeamProducts: EditTeamProductInterface[] = [];

  // Fetch and Transform Products
  for (let i = 0; i < productIds.length; i++) {
    const product = await core.product.fetchProduct(productIds[i]);
    if (!("error" in product)) {
      editTeamProducts.push({
        id: product.id,
        name: product.productData.name,
        image: null,
        imageId: product.productData.imageId,
      });
    }
  }

  return editTeamProducts;
};
