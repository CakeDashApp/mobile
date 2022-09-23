import React, {useContext} from "react";
import * as Animatable from "react-native-animatable";
import styled from "styled-components/native";
import CButton from "../../../../components/default/cButton";
import CIcon from "../../../../../assets/icons/cIcon";
import { SafeAreaView } from "react-native";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
}

const AddButton: React.FC<Props> = (props) => {
  // Props
  const { onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <SafeAreaView>
      <AnimatedContainer animation={"bounceIn"} style={theme.shadow}>
        <CButton
          onPress={onPress}
          round
          color={[theme.colors.secondary, theme.colors.secondary_2]}
          width={70}
          height={70}
          shadow
        >
          <CIcon type={"plus"} color={theme.colors.on_secondary} size={30} />
        </CButton>
      </AnimatedContainer>
    </SafeAreaView>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const AnimatedContainer = Animatable.createAnimatableComponent(styled.View`
  position: absolute;
  right: 0;
  bottom: 60px;
  margin: 10px;
`);

export default AddButton;
