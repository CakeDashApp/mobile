import React, {useContext} from "react";
import styled from "styled-components/native";
import CText from "../../../../components/default/cText";
import { View } from "react-native";
import strings from "../strings";
import { ThemeInterface } from "../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  dashGiverName: string | false;
  dashReceiverName: string;
  creationDate: string;
}

const InfoView: React.FC<Props> = (props) => {
  // Props
  const { dashGiverName, dashReceiverName, creationDate } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <InfoContainer>
        {dashReceiverName && (
          <View>
            <InfoTitle size={10} color={theme.colors.on_surface_3}>
              {strings().fromTitle}
            </InfoTitle>
            <CText color={theme.colors.on_surface}>{dashGiverName}</CText>
          </View>
        )}
        <View>
          <InfoTitle size={10} color={theme.colors.on_surface_3}>
            {strings().forTitle}
          </InfoTitle>
          <CText color={theme.colors.on_surface}>{dashReceiverName}</CText>
        </View>
        <View>
          <InfoTitle size={10} color={theme.colors.on_surface_3}>
            {strings().createdTitle}
          </InfoTitle>
          <CText color={theme.colors.on_surface}>{creationDate}</CText>
        </View>
      </InfoContainer>
      <Separator />
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin-top: 20px;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px 0 5px;
`;

const InfoTitle = styled(CText)`
  margin-bottom: 2px;
`;

const Separator = styled.View<{ theme: ThemeInterface }>`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.on_surface_3};
  margin-top: 10px;
`;

export default InfoView;
