import React, {useContext} from "react";
import styled from "styled-components/native";
import CText from "../../../../../../../components/default/cText";
import CSlider from "../../../../../../../components/project/cSlider";
import CImage from "../../../../../../../components/default/cImage";
import strings from "./strings";
import { Dimensions } from "react-native";
import { ProductInterface } from "../../../../../../../../src/core/controllers/product/product.interface";
import { MemberInterface } from "../../../../../../../../src/core/controllers/member/member.interface";
import { ThemeInterface } from "../../../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {
  product?: ProductInterface;
  member: MemberInterface;
}

const ProductView: React.FC<Props> = (props) => {
  // Props
  const { product, member } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <CurrentDashesContainer>
        <CText color={theme.colors.on_surface_2}>
          {strings().currentDashesTitle}
        </CText>
        <SliderContainer>
          <Slider
            endValue={member.memberData.product.dashesNeeded}
            sliders={[
              {
                currentValue: member.memberData.product.dashes,
                color: [theme.colors.secondary, theme.colors.secondary_2],
              },
            ]}
            backgroundColor={theme.colors.on_surface_3}
          />
          <SliderText bold color={theme.colors.on_surface} size={20}>
            {member.memberData.product.dashes +
              "/" +
              member.memberData.product.dashesNeeded}
          </SliderText>
        </SliderContainer>
      </CurrentDashesContainer>
      {product && (
        <ProductContainer>
          <CText color={theme.colors.on_surface_2}>
            {strings().currentProductTitle}
          </CText>
          <ProductItemContainer>
            <ProductImage
              id={product.productData.imageId}
              width={50}
              height={50}
            />
            <CText bold color={theme.colors.on_surface} size={20}>
              {product.productData.name}
            </CText>
          </ProductItemContainer>
        </ProductContainer>
      )}
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 20px;
  padding: 20px 20px 30px 20px;
  margin: 10px 10px 0 10px;
  width: ${Dimensions.get("window").width - 20}px;
`;

const SliderContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const Slider = styled(CSlider)`
  width: 85%;
  margin-right: 5px;
`;

const SliderText = styled(CText)`
  width: 15%;
`;

const CurrentDashesContainer = styled.View`
  margin-top: 5px;
`;

const ProductContainer = styled.View`
  margin-top: 20px;
`;

const ProductImage = styled(CImage)`
  border-radius: 10px;
  margin-right: 10px;
`;

const ProductItemContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;

export default ProductView;
