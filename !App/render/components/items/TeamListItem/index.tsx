import React, {useCallback, useContext, useState} from "react";
import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import CText from "../../default/cText";
import CIcon from "../../../../assets/icons/cIcon";
import CImage from "../../default/cImage";
import MoreButton from "./components/MoreButton";
import Label from "./components/Label";
import JoinButton from "./components/JoinButton";
import CRefresh from "../../project/cRefresh";
import { TeamInterface } from "../../../../src/core/controllers/team/team.interface";
import ThemeContext from "../../../../context/ThemeContext";

interface Props {
  team: TeamInterface;
  moreButton?: {
    onEdit?: (id: string) => void;
    onRemove?: (id: string) => void;
    onLeave?: (id: string) => void;
  };
  joinButton?: {
    onJoin: (id: string) => void;
  };
  onPress: (id: string) => void;
  backgroundColor: string;
}

const TeamListItem: React.FC<Props> = (props) => {
  // Props
  const { team, moreButton, backgroundColor, joinButton, onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Default
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //======================================================================================================================
  // On Join
  //======================================================================================================================

  const onJoin = useCallback(
    async (id: string) => {
      setIsLoading(true);
      await joinButton?.onJoin(id);
      setIsLoading(false);
    },
    [joinButton]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity onPress={() => onPress(team.id)}>
      <Container>
        <LeftContainer>
          <View>
            <Image id={team.teamData.imageId} width={75} height={75} />
            <Label
              type={team.teamData.settings.status}
              backgroundColor={backgroundColor}
            />
          </View>
          <View>
            <CText bold color={theme.colors.on_background} size={25}>
              {team.teamData.name}
            </CText>
            <MemberCountContainer>
              <CIcon
                size={20}
                color={theme.colors.on_background}
                type={"users"}
                strokeWidth={2}
              />
              <MemberCountText
                bold
                color={theme.colors.on_background}
                size={20}
              >
                {team.teamData.members.memberIds.length}
              </MemberCountText>
            </MemberCountContainer>
          </View>
        </LeftContainer>
        <ButtonContainer>
          {!isLoading && moreButton && (
            <MoreButton
              teamId={team.id}
              onEdit={moreButton.onEdit}
              onRemove={moreButton.onRemove}
              onLeave={moreButton.onLeave}
            />
          )}
          {!isLoading && joinButton && (
            <JoinButton teamId={team.id} onJoin={onJoin} />
          )}
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

const MemberCountContainer = styled.View`
  margin-top: -5px;
  flex-direction: row;
  align-items: center;
`;

const MemberCountText = styled(CText)`
  margin-left: 5px;
`;

const ButtonContainer = styled.View`
  margin-right: 20px;
`;

export default TeamListItem;
