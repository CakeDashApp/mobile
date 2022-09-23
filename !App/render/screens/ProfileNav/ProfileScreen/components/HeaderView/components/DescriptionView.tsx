import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import CText from "../../../../../../components/default/cText";
import strings from "../strings";
import core from "../../../../../../../src/core";
import styled from "styled-components/native";
import ThemeContext from "../../../../../../../context/ThemeContext";
import { useAgile } from "@agile-ts/react";

interface Props {
  onPress: () => void;
}

const DescriptionView: React.FC<Props> = (props) => {
  // Props
  const { onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Description
  const [maxDescriptionLength] = useState<number>(50);

  const user = useAgile(core.user.CURRENT_USER);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <TouchableOpacity
        onPress={onPress}
        disabled={
          user && user?.userData.description.length < maxDescriptionLength
        }
      >
        <CText color={theme.colors.on_primary_3}>
          {strings().descriptionTitle}
        </CText>
        <CText color={theme.colors.on_primary}>
          {core.helper.text.shortText(
            user?.userData.description || "",
            maxDescriptionLength
          )}
        </CText>
      </TouchableOpacity>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin: 10px 0 10px 0;
`;

export default DescriptionView;
