import React, {useContext} from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import CakeListItem from "../../../../../../components/items/CakeListItem";
import { CakeInterface } from "../../../../../../../src/core/controllers/cake/cake.interface";
import { ThemeInterface } from "../../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  onPressCake: (id: string) => void;
  cakes: CakeInterface[];
}

const CakesListView: React.FC<Props> = (props) => {
  // Props
  const { cakes, onPressCake } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <FlatList
        data={cakes.sort(function (a, b) {
          return (
            new Date(b.cakeData.date.creationDate).getTime() -
            new Date(a.cakeData.date.creationDate).getTime()
          );
        })}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <CakeListItem cake={itemData.item} showDate />
        )}
      />
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export default CakesListView;
