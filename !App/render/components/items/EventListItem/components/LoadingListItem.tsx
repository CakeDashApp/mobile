import React, {useContext} from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import Label from "./Label";
import CRefresh from "../../../project/cRefresh";
import { ThemeInterface } from "../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  backgroundColor: string;
}

const LoadingListItem: React.FC<Props> = (props) => {
  // Props
  const { backgroundColor } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <View>
        <DummyImage>
          <CRefresh color={theme.colors.surface} />
        </DummyImage>
        <Label type={"info"} backgroundColor={backgroundColor} isDummy />
      </View>
      <TextContainer>
        <DummyTitle />
        <DummySubtitle />
      </TextContainer>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
`;

const DummyImage = styled.View<{ theme: ThemeInterface }>`
  border-radius: 10px;
  margin-right: 10px;
  width: 75px;
  height: 75px;
  background-color: ${(props) => props.theme.colors.on_surface_2};
  align-items: center;
  justify-content: center;
`;

const DummyTitle = styled.View<{ theme: ThemeInterface }>`
  margin-bottom: 5px;
  border-radius: 5px;
  margin-right: 5px;
  height: 20px;
  width: 150px;
  background-color: ${(props) => props.theme.colors.on_surface_3};
`;

const DummySubtitle = styled.View<{ theme: ThemeInterface }>`
  border-radius: 5px;
  margin-right: 5px;
  height: 15px;
  width: 80px;
  background-color: ${(props) => props.theme.colors.on_surface_3};
`;

const TextContainer = styled.View`
  width: 0;
  flex-grow: 1;
`;

export default LoadingListItem;
