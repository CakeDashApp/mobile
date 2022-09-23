import React, {useCallback, useContext, useEffect, useState} from "react";
import styled from "styled-components/native";
import core from "../../../../../../../../src/core";
import CIcon from "../../../../../../../../assets/icons/cIcon";
import CText from "../../../../../../../components/default/cText";
import CTabRow, {
  TagInterface,
} from "../../../../../../../components/project/cTabRow";
import * as controller from "./controller";
import MembersListView from "./components/MembersListView";
import strings from "./strings";
import { useAgile } from "@agile-ts/react";
import { MemberInterface } from "../../../../../../../../src/core/controllers/member/member.interface";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {
  teamId: string | null;
  goToMemberListModal: (teamId: string, search: boolean) => void;
  goToMember: (memberId: string, teamId: string) => void;
}

const MembersView: React.FC<Props> = (props) => {
  // Props
  const { teamId, goToMemberListModal, goToMember } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Members
  const [filteredMembers, setFilteredMembers] = useState<MemberInterface[]>([]);
  const members = useAgile(core.member.MEMBERS.getGroup(teamId || ""));

  // Tag
  const [currentTag, setCurrentTag] = useState<string | number>(
    controller.ALL_TAG
  );

  //======================================================================================================================
  // Set Start Tag
  //======================================================================================================================

  useEffect(() => {
    setFilteredMembers(controller.filterMembers(currentTag, members));
  }, [members]);

  //======================================================================================================================
  // On Tag Changed
  //======================================================================================================================

  const onTagChanged = useCallback(
    (tag: TagInterface) => {
      setCurrentTag(tag.key);
      setFilteredMembers(controller.filterMembers(tag.key, members));
    },
    [members]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <HeaderContainer>
        <CIcon
          type={"users"}
          color={theme.colors.on_background}
          size={25}
          strokeWidth={2}
        />
        <MemberText bold color={theme.colors.on_background} size={25}>
          {strings().membersTitle}
        </MemberText>
      </HeaderContainer>
      <CTabRow
        tags={[
          { key: controller.ALL_TAG, label: strings().allTagText },
          { key: controller.ADMIN_TAG, label: strings().adminTagText },
        ]}
        onTagChanged={onTagChanged}
        searchTag={{
          onSearch: () => goToMemberListModal(teamId || "", true),
          isDummy: true,
        }}
      />
      <MembersListView
        members={filteredMembers}
        onMember={(id: string) => goToMember(id, teamId || "")}
        onMoreMembers={() => goToMemberListModal(teamId || "", false)}
      />
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin: 20px 10px 0 10px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MemberText = styled(CText)`
  margin-left: 5px;
`;

export default MembersView;
