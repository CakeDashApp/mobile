import React from "react";
import CText from "../../../../../../../../components/default/cText";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeInterface } from "../../../../../../../../../src/core/controllers/ui/interfaces";

interface Props {
  onPress: () => void;
  totalMemberCount: number;
  maxShownMembers: number;
}

const MoreImage: React.FC<Props> = (props) => {
  // Props
  const { onPress, maxShownMembers, totalMemberCount } = props;

  // Text
  const textSize = totalMemberCount - maxShownMembers > 9 ? 8 : 10;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity onPress={onPress}>
      <MoreMemberImageContainer>
        <CText size={textSize}>{totalMemberCount - maxShownMembers}+</CText>
      </MoreMemberImageContainer>
    </TouchableOpacity>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const MoreMemberImageContainer = styled.View<{ theme: ThemeInterface }>`
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.on_background_2};
  border-radius: 100px;
`;

export default MoreImage;
