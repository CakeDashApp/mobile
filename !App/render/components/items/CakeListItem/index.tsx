import React, {useContext} from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import core from "../../../../src/core";
import CText from "../../default/cText";
import CImage from "../../default/cImage";
import strings from "./strings";
import { useAgile } from "@agile-ts/react";
import { CakeInterface } from "../../../../src/core/controllers/cake/cake.interface";
import ThemeContext from "../../../../context/ThemeContext";

interface Props {
  cake: CakeInterface;
  onPress?: (cakeId: string) => void;
  showDate?: boolean;
}

const CakeListItem: React.FC<Props> = (props) => {
  // Props
  const { cake, onPress, showDate } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Member
  const member = useAgile(core.member.MEMBERS.getItemById(cake.memberId));

  // User
  const userId = useAgile(core.auth.USER_ID);
  const isMainUser = member?.userId === userId;

  // Text
  const fromText = strings().listItemSubtitle.replace(
    "${name}",
    member?.memberData.name || "unknown"
  );
  const dateText = core.helper.platform.date.formatDateToDeviceDateString(
    new Date(cake.cakeData.date.creationDate)
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress(cake.id) : {})}
      disabled={!onPress || !isMainUser}
    >
      <Container>
        <Image id={cake.cakeData.product.imageId} width={75} height={75} />
        <TextContainer>
          <CText bold color={theme.colors.on_background} size={25}>
            {cake.cakeData.product.name !== core.cake.randomCakeKey
              ? cake.cakeData.product.name
              : strings().randomCakeTitle}
          </CText>
          <CText color={theme.colors.on_surface_2} size={10}>
            {showDate ? dateText : fromText}
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

export default CakeListItem;
