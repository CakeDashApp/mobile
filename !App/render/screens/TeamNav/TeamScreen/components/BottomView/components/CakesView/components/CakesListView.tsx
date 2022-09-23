import React from "react";
import { View } from "react-native";
import CakeListItem from "../../../../../../../../components/items/CakeListItem";
import CBottomButton from "../../../../../../../../components/project/cBottomButton";
import styled from "styled-components/native";
import { CakeInterface } from "../../../../../../../../../src/core/controllers/cake/cake.interface";

interface Props {
  cakes: CakeInterface[];
  onMoreButtonPressed: () => void;
  onCakePressed: (id: string) => void;
}

const CakesListView: React.FC<Props> = (props) => {
  // Props
  const { cakes, onMoreButtonPressed, onCakePressed } = props;

  const maxCakesShown = 2;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      {cakes
        .sort(function (a, b) {
          return (
            new Date(b.cakeData.date.creationDate).getTime() -
            new Date(a.cakeData.date.creationDate).getTime()
          );
        })
        .slice(0, maxCakesShown)
        .map((cake) => (
          <View key={cake.id}>
            <CakeListItem cake={cake} onPress={onCakePressed} />
          </View>
        ))}
      {cakes.length > maxCakesShown && (
        <BottomButtonContainer>
          <CBottomButton onPress={onMoreButtonPressed} icon={"chevronDown"} />
        </BottomButtonContainer>
      )}
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const BottomButtonContainer = styled.View`
  align-items: center;
`;

export default CakesListView;
