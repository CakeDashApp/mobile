import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as controller from "../../../../controller";
import ProductImagePicker from "../ProductImagePicker";
import styled from "styled-components/native";
import { EditTeamProductInterface } from "../../../../controller";
import ProductListItem from "../ProductListItem";
import NameInput from "./components/NameInput";
import AddButton from "./components/AddButton";
import { ImageInterface } from "../../../../../../../../../../src/core/controllers/image/image.interface";
import { ThemeInterface } from "../../../../../../../../../../src/core/controllers/ui/interfaces";

interface Props {
  isDummy: boolean;
  onFocus: () => void;
  flatList?: boolean;
}

const AddProductsView: React.FC<Props> = (props) => {
  // Props
  const { isDummy, onFocus, flatList } = props;

  // Error
  const [showInputError, setShowInputError] = useState<boolean>(false);

  // Products
  const products: EditTeamProductInterface[] =
    controller.TeamEditor.getValue("products") || [];

  //======================================================================================================================
  // Set Product Default Values
  //======================================================================================================================

  useEffect(() => {
    controller.setProductEditorValues();
  }, []);

  //======================================================================================================================
  // On Add Product
  //======================================================================================================================

  const onAddProduct = useCallback(async () => {
    setShowInputError(false);

    // Submit
    const submitResponse = await controller.ProductEditor.submit();
    if (submitResponse && "error" in submitResponse) {
      setShowInputError(true);
    }
    // Set new Product Default Values
    else controller.setProductEditorValues();
  }, []);

  //======================================================================================================================
  // On Remove Product
  //======================================================================================================================

  const onRemoveProduct = useCallback(
    (id: string) => {
      // Remove Product
      const newProducts = products.filter((product) => product.id !== id);

      // Update Team Editor
      controller.TeamEditor.setValue("products", newProducts);
    },
    [products]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <TouchableOpacity onPress={onFocus} disabled={!isDummy}>
        {/* Fixed can touch TextInput/ImagePicker trough Touchable bug */}
        <View pointerEvents={isDummy ? "none" : undefined}>
          <InputContainer>
            <ProductImagePicker
              onImageChange={(image: ImageInterface) =>
                controller.ProductEditor.setValue("image", image)
              }
              defaultImage={controller.ProductEditor.getOriginalValue("image")}
              image={controller.ProductEditor.getValue("image")}
            />
            <RightContainer>
              <NameInput showInputError={showInputError} isDummy={isDummy} />
              <AddButton onPress={onAddProduct} />
            </RightContainer>
          </InputContainer>
        </View>
      </TouchableOpacity>
      <Separator />
      {flatList ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ProductListItem
              product={itemData.item}
              onRemove={onRemoveProduct}
            />
          )}
        />
      ) : (
        products.map((product: EditTeamProductInterface, key: number) => {
          return (
            <View key={key}>
              <ProductListItem product={product} onRemove={onRemoveProduct} />
            </View>
          );
        })
      )}
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin-top: 20px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RightContainer = styled.View`
  align-items: flex-end;
`;

const Separator = styled.View<{ theme: ThemeInterface }>`
  margin: 10px 0;
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.on_background_2};
  opacity: 0.5;
`;

export default AddProductsView;
