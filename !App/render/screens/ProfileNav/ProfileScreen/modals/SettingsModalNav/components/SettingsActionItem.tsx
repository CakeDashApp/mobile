import React, {useContext} from "react";
import CIcon from "../../../../../../../assets/icons/cIcon";
import CText from "../../../../../../components/default/cText";
import styled from "styled-components/native";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  // Title
  title: string;
  subtitle: string;

  // Color
  color: string;
  iconColor?: string;

  // Icon
  icon: string;

  // Style
  style?: object;
}

const SettingsActionItem: React.FC<Props> = (props) => {
  // Props
  const { color, subtitle, title, children, icon, style } = props;
  const iconColor = props.iconColor || "#FFFFFF";

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <ContentContainer style={style}>
      <LeftContainer>
        <IconContainer color={color}>
          <CIcon size={30} type={icon} color={iconColor} strokeWidth={2} />
        </IconContainer>
        <TextContainer>
          <CText bold size={20} color={theme.colors.on_surface}>
            {title}
          </CText>
          <Description size={10} color={theme.colors.on_surface_2}>
            {subtitle}
          </Description>
        </TextContainer>
      </LeftContainer>
      {children}
    </ContentContainer>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 100px;
  padding: 15px;
`;

const TextContainer = styled.View`
  margin-left: 15px;
`;

const Description = styled(CText)`
  margin-top: 2px;
`;

export default SettingsActionItem;
