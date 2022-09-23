import React, {useContext} from "react";
import styled from "styled-components/native";
import CText from "../../../../components/default/cText";
import core from "../../../../../src/core";
import { TouchableOpacity, View } from "react-native";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  description: string;
  title: string;
  onShowFullDescription: () => void;
}

const TextView: React.FC<Props> = (props) => {
  // Props
  const { description, title, onShowFullDescription } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <CText bold size={30} color={theme.colors.on_surface}>
        {title}
      </CText>
      <TouchableOpacity onPress={onShowFullDescription}>
        <Description color={theme.colors.on_surface}>
          {core.helper.text.shortText(description, 200)}
        </Description>
      </TouchableOpacity>
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Description = styled(CText)`
  margin-top: 10px;
`;

export default TextView;
