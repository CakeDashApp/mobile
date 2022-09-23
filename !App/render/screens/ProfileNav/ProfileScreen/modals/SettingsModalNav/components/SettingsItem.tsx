import React, {useContext} from "react";
import styled from "styled-components/native";
import CIcon from "../../../../../../../assets/icons/cIcon";
import CText from "../../../../../../components/default/cText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeInterface } from "../../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  // Text
  title: string;
  subtitle: string;

  // Icon
  icon: string;

  // Color
  color: string;
  iconColor?: string;

  // On Press
  onPress: () => void;

  // Style
  style?: object;
}

const SettingsItem: React.FC<Props> = (props) => {
  // Props
  const { title, subtitle, icon, color, onPress, style } = props;
  const iconColor = props.iconColor || "#FFFFFF";

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Separator />
      <ContentContainer>
        <LeftContainer>
          <IconContainer color={color}>
            <CIcon size={40} color={iconColor} type={icon} strokeWidth={2} />
          </IconContainer>
          <TextContainer>
            <CText bold size={25} color={theme.colors.on_surface}>
              {title}
            </CText>
            <CText size={12} color={theme.colors.on_surface_2}>
              {subtitle}
            </CText>
          </TextContainer>
        </LeftContainer>
        <CIcon type={"chevronRight"} color={theme.colors.on_surface} />
      </ContentContainer>
      <Separator />
    </TouchableOpacity>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  margin-left: 5px;
  align-items: center;
`;

const IconContainer = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 10px;
  padding: 10px;
`;

const TextContainer = styled.View`
  margin-left: 15px;
`;

const Separator = styled.View<{ theme: ThemeInterface }>`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.on_surface};
`;

export default SettingsItem;
