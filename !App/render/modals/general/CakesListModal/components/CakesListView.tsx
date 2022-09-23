import React from "react";
import { FlatList, View } from "react-native";
import CakeListItem from "../../../../components/items/CakeListItem";
import { CakeInterface } from "../../../../../src/core/controllers/cake/cake.interface";

interface Props {
  cakes: CakeInterface[];
  onCakePressed: (id: string) => void;
}

const CakesListView: React.FC<Props> = (props) => {
  // Props
  const { cakes, onCakePressed } = props;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <FlatList
      data={cakes.sort(function (a, b) {
        return (
          new Date(b.cakeData.date.creationDate).getTime() -
          new Date(a.cakeData.date.creationDate).getTime()
        );
      })}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <View
          style={{
            marginBottom: itemData.index === cakes.length - 1 ? 200 : 0,
          }}
        >
          <CakeListItem cake={itemData.item} onPress={onCakePressed} />
        </View>
      )}
    />
  );
};

export default CakesListView;
