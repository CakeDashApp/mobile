import React, {useContext, useState} from "react";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import CText from "../../default/cText";
import CImage from "../../default/cImage";
import MoreButton from "./components/MoreButton";
import CRefresh from "../../project/cRefresh";
import StatusLabel from "./components/StatusLabel";
import RoleLabel from "./components/RoleLabel";
import { MemberInterface } from "../../../../src/core/controllers/member/member.interface";
import ThemeContext from "../../../../context/ThemeContext";

interface Props {
  member: MemberInterface;
  moreButton?: {
    onKick?: (id: string) => void;
    onCreator?: (id: string) => void;
    onAdmin?: (id: string, admin: boolean) => void;
  };
  onPress: (id: string) => void;
  backgroundColor: string;
}

const MemberListItem: React.FC<Props> = (props) => {
  // Props
  const { member, moreButton, backgroundColor, onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Default
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity onPress={() => onPress(member.id)}>
      <Container>
        <LeftContainer>
          <View>
            <Image id={member.memberData.imageId} width={75} height={75} />
            <StatusLabel
              type={member.memberData.status}
              backgroundColor={backgroundColor}
            />
          </View>
          <View>
            <CText bold color={theme.colors.on_background} size={25}>
              {member.memberData.name}
            </CText>
            <RoleLabel type={member.memberData.role} />
          </View>
        </LeftContainer>
        <ButtonContainer>
          {
            // If no kick right the user has no rights at all ^
            !isLoading && moreButton && moreButton.onKick && (
              <MoreButton
                member={member}
                onKick={moreButton.onKick}
                onAdmin={moreButton.onAdmin}
                onCreator={moreButton.onCreator}
              />
            )
          }
          {isLoading && <CRefresh color={theme.colors.on_surface} />}
        </ButtonContainer>
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
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Image = styled(CImage)`
  border-radius: 10px;
  margin-right: 10px;
`;

const ButtonContainer = styled.View`
  margin-right: 20px;
`;

export default MemberListItem;
