import React, {useContext} from "react";
import { FlatList, View } from "react-native";
import MemberListItem from "../../../../components/items/MemberListItem";
import core from "../../../../../src/core";
import * as controller from "../controller";
import { MemberInterface } from "../../../../../src/core/controllers/member/member.interface";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  teamId: string;
  members: MemberInterface[];
  onKickMember?: (memberId: string) => void;
  onCreatorMember?: (memberId: string) => void;
  onAdminMember?: (memberId: string, admin: boolean) => void;
  onPressMember: (memberId: string, teamId: string) => void;
}

const MembersView: React.FC<Props> = (props) => {
  // Props
  const {
    members,
    onKickMember,
    onPressMember,
    teamId,
    onAdminMember,
    onCreatorMember,
  } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Member
  const userMember = core.team.getUserMember(teamId || "");

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <FlatList
      data={members}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <View
          style={{
            marginBottom: itemData.index === members.length - 1 ? 200 : 0,
          }}
        >
          <MemberListItem
            member={itemData.item}
            onPress={(id: string) => onPressMember(id, teamId)}
            moreButton={{
              onKick: controller.canBeKicked(itemData.item, userMember)
                ? onKickMember
                : undefined,
              onAdmin: controller.canBeAdmin(itemData.item, userMember)
                ? onAdminMember
                : undefined,
              onCreator: controller.canBeCreator(itemData.item, userMember)
                ? onCreatorMember
                : undefined,
            }}
            backgroundColor={theme.colors.surface}
          />
        </View>
      )}
    />
  );
};

export default MembersView;
