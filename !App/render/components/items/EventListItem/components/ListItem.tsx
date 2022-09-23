import CText from "../../../default/cText";
import React, {useContext} from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import core from "../../../../../src/core";
import CImage from "../../../default/cImage";
import Label from "./Label";
import {
  EventInterface,
  EventListItemInterface,
} from "../../../../../src/core/controllers/event/event.interface";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  event: EventInterface;
  eventListItem: EventListItemInterface;
  onPress: (eventId: string, screen: string) => void;
  backgroundColor: string;
}

const ListItem: React.FC<Props> = (props) => {
  // Props
  const { event, eventListItem, onPress, backgroundColor } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity
      onPress={() =>
        event.eventData.navigation
          ? onPress(event.id, event.eventData.navigation?.screen)
          : {}
      }
      disabled={!event.eventData.navigation}
    >
      <Container>
        <View>
          <Image id={eventListItem.imageId} width={75} height={75} />
          <Label
            type={eventListItem.labelType}
            backgroundColor={backgroundColor}
          />
        </View>
        <TextContainer>
          <CText
            bold
            color={theme.colors.on_background}
            numberOfLines={2}
            size={20}
          >
            {eventListItem.title}
          </CText>
          <CText color={theme.colors.on_surface_2} size={10}>
            {core.helper.platform.date.formatDateToDeviceDateString(
              new Date(event.eventData.date.creationDate)
            )}
          </CText>
        </TextContainer>
      </Container>
    </TouchableOpacity>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
`;

const Image = styled(CImage)`
  border-radius: 10px;
  margin-right: 10px;
`;

const TextContainer = styled.View`
  width: 0;
  flex-grow: 1;
`;

export default ListItem;
