import React, {useContext} from "react";
import { EditTeamProductInterface } from "../../../../controller";
import styled from "styled-components/native";
import CImage from "../../../../../../../../../components/default/cImage";
import CText from "../../../../../../../../../components/default/cText";
import DeleteButton from "./components/DeleteButton";
import ThemeContext from "../../../../../../../../../../context/ThemeContext";

interface Props {
  product: EditTeamProductInterface;

  onRemove: (id: string) => void;
}

const ProductListItem: React.FC<Props> = (props) => {
  // Props
  const { product, onRemove } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <LeftContainer>
        <Image
          id={product.imageId}
          image={product.image}
          width={75}
          height={75}
        />
        <CText bold color={theme.colors.on_surface} size={25}>
          {product.name}
        </CText>
      </LeftContainer>
      <DeleteButton onPress={() => onRemove(product.id)} />
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Image = styled(CImage)`
  border-radius: 10px;
  margin-right: 10px;
`;

export default ProductListItem;
