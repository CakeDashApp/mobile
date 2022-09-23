import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import CakeListItem from "../../../../components/items/CakeListItem";
import { CakeInterface } from "../../../../../src/core/controllers/cake/cake.interface";
import { ThemeInterface } from "../../../../../src/core/controllers/ui/interfaces";

interface Props {
  onCakePressed: (id: string) => void;
  cakes: CakeInterface[];
}

const CakesListView: React.FC<Props> = (props) => {
  // Props
  const { onCakePressed, cakes } = props;

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
          <CakeListItem cake={itemData.item} onPress={onCakePressed} showDate />
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
  padding: 10px;
`;

export default CakesListView;
